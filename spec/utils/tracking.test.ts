import { trackRecommendationView } from '../../src/utils/tracking';
import { RecommendationsSection } from '../../src/types';

const makeSection = (indexSectionName: string): RecommendationsSection =>
  ({
    type: 'recommendations',
    podId: 'bestsellers',
    indexSectionName,
    data: [{ value: `${indexSectionName}-value`, data: { id: `${indexSectionName}-id` } }],
  }) as unknown as RecommendationsSection;

const makeTarget = (dataset: Record<string, string | undefined>) => {
  const target = document.createElement('div');
  Object.entries(dataset).forEach(([key, value]) => {
    if (value !== undefined) target.dataset[key] = value;
  });
  return target;
};

const makeClient = () => {
  const trackRecommendationViewSpy = jest.fn();
  return {
    client: { tracker: { trackRecommendationView: trackRecommendationViewSpy } } as any,
    trackRecommendationViewSpy,
  };
};

describe('trackRecommendationView', () => {
  const sections = [makeSection('Products'), makeSection('Search Suggestions')];

  it('matches the section whose podKey matches podId + section, not just podId', () => {
    const { client, trackRecommendationViewSpy } = makeClient();
    const target = makeTarget({
      cnstrcRecommendationsPodId: 'bestsellers',
      cnstrcSection: 'Search Suggestions',
    });

    trackRecommendationView(target, sections, client);

    expect(trackRecommendationViewSpy).toHaveBeenCalledTimes(1);
    const payload = trackRecommendationViewSpy.mock.calls[0][0];
    expect(payload.section).toBe('Search Suggestions');
    expect(payload.numResultsViewed).toBe(1);
    expect(payload.items).toEqual([
      {
        itemId: 'Search Suggestions-id',
        itemName: 'Search Suggestions-value',
        variationId: undefined,
      },
    ]);
  });

  it('does not match any section when section attribute is missing (no arbitrary first-pod match)', () => {
    const { client, trackRecommendationViewSpy } = makeClient();
    const target = makeTarget({ cnstrcRecommendationsPodId: 'bestsellers' });

    trackRecommendationView(target, sections, client);

    expect(trackRecommendationViewSpy).toHaveBeenCalledTimes(1);
    const payload = trackRecommendationViewSpy.mock.calls[0][0];
    // Missing cnstrcSection resolves to the default ('Products') podKey, so it matches the
    // Products section deterministically rather than arbitrarily grabbing the first pod.
    expect(payload.numResultsViewed).toBe(1);
    expect(payload.items).toEqual([
      { itemId: 'Products-id', itemName: 'Products-value', variationId: undefined },
    ]);
  });
});
