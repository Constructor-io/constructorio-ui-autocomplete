import { Nullable } from '@constructor-io/constructorio-client-javascript';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript/lib/types/constructorio';
import { isRecommendationsSection } from '../typeGuards';
import { Section } from '../types';

// eslint-disable-next-line import/no-cycle
import { CONSTANTS, storeRecentSearch, storeRecentAction } from './beaconUtils';
import { storageSetItem, storageRemoveItem } from './storage';

export function isTrackingRequestSent(trackingRequestUrl: string) {
  // eslint-disable-next-line
  const trackingRequestsQueue = window.localStorage?._constructorio_requests;

  return (
    trackingRequestsQueue &&
    JSON.parse(trackingRequestsQueue)?.some((request) => request?.url?.includes(trackingRequestUrl))
  );
}
export const trackRecommendationView = (
  target: HTMLElement,
  activeSectionsWithData: Section[],
  cioClient: Nullable<ConstructorIOClient>
) => {
  if (target.dataset.cnstrcRecommendationsPodId) {
    // Pull recommendations from activeSectionsWithData by podId surfaced on target
    const recommendationSection = activeSectionsWithData.find(
      (section) =>
        isRecommendationsSection(section) &&
        section.podId === target.dataset.cnstrcRecommendationsPodId
    );
    const recommendationItems = recommendationSection?.data.map((item) => ({
      itemId: item.data?.id,
      itemName: item.value,
      variationId: item.data?.variation_id,
    }));

    cioClient?.tracker.trackRecommendationView({
      podId: target.dataset.cnstrcRecommendationsPodId,
      numResultsViewed: recommendationItems?.length || 0,
      url: window.location.href,
      section: target.dataset.cnstrcSection,
      items: recommendationItems,
    });
  }
};
export const trackSearchSubmit = (cioClient, term, autocompleteData = {}) => {
  cioClient?.tracker.trackSearchSubmit(term, autocompleteData);
  storageSetItem(CONSTANTS.SEARCH_TERM_STORAGE_KEY, term);
  storeRecentSearch(term, {});
  storeRecentAction(CONSTANTS.SEARCH_SUBMIT);
};
export const trackAutocompleteSelect = (cioClient, itemName, autocompleteData: any = {}) => {
  cioClient?.tracker.trackAutocompleteSelect(itemName, autocompleteData);
  if (autocompleteData?.section! === 'Products') {
    storageRemoveItem(CONSTANTS.SEARCH_TERM_STORAGE_KEY);
  }
};
