import { renderHook, waitFor } from '@testing-library/react';
import useFetchRecommendationPod from '../../src/hooks/useFetchRecommendationPod';
import { RecommendationsSectionConfiguration } from '../../src/types';
import { getRecommendationPodKey } from '../../src/utils/helpers';

const buildResponse = (section: string) => ({
  request: { section, num_results: 1, pod_id: 'bestsellers' },
  response: {
    results: [
      {
        data: { id: `${section}-id` },
        value: `${section}-value`,
        strategy: { id: 'bestsellers' },
      },
    ],
    total_num_results: 1,
    pod: { id: 'bestsellers', display_name: 'Best Sellers' },
  },
  result_id: `result-${section}`,
});

const makeClient = () => {
  const getRecommendations = jest.fn((_podId: string, params: { section: string }) =>
    Promise.resolve(buildResponse(params.section))
  );
  return { recommendations: { getRecommendations } } as any;
};

describe('useFetchRecommendationPod', () => {
  it('keeps results separate when two pods share a podId but target different indexSectionName', async () => {
    const cioClient = makeClient();
    const pods: RecommendationsSectionConfiguration[] = [
      { type: 'recommendations', podId: 'bestsellers', indexSectionName: 'Products' },
      { type: 'recommendations', podId: 'bestsellers', indexSectionName: 'Search Suggestions' },
    ];

    const { result } = renderHook(() => useFetchRecommendationPod(cioClient, pods));

    await waitFor(() => {
      expect(Object.keys(result.current.recommendationsResults)).toHaveLength(2);
    });

    const productsKey = getRecommendationPodKey({
      podId: 'bestsellers',
      indexSectionName: 'Products',
    });
    const suggestionsKey = getRecommendationPodKey({
      podId: 'bestsellers',
      indexSectionName: 'Search Suggestions',
    });

    expect(result.current.recommendationsResults[productsKey][0].value).toBe('Products-value');
    expect(result.current.recommendationsResults[suggestionsKey][0].value).toBe(
      'Search Suggestions-value'
    );

    expect(result.current.podsData[productsKey].resultId).toBe('result-Products');
    expect(result.current.podsData[suggestionsKey].resultId).toBe('result-Search Suggestions');
  });

  it('keys a single pod by composite key', async () => {
    const cioClient = makeClient();
    const pods: RecommendationsSectionConfiguration[] = [
      { type: 'recommendations', podId: 'bestsellers', indexSectionName: 'Products' },
    ];

    const { result } = renderHook(() => useFetchRecommendationPod(cioClient, pods));

    await waitFor(() => {
      expect(Object.keys(result.current.recommendationsResults)).toHaveLength(1);
    });

    const key = getRecommendationPodKey({ podId: 'bestsellers', indexSectionName: 'Products' });
    expect(result.current.recommendationsResults[key]).toHaveLength(1);
    expect(result.current.podsData[key].podId).toBe('bestsellers');
  });
});
