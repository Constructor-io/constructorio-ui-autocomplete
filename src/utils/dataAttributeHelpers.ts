import { Item, Section } from '../types';
import { isInGroupSuggestion, isRecommendationsSection, isSearchSuggestion } from '../typeGuards';

export const cnstrcDataAttrs = {
  common: {
    itemId: 'data-cnstrc-item-id',
    itemName: 'data-cnstrc-item-name',
    itemPrice: 'data-cnstrc-item-price',
    variationId: 'data-cnstrc-item-variation-id',
    numResults: 'data-cnstrc-num-results',
    conversionBtn: 'data-cnstrc-btn',
    resultId: 'data-cnstrc-result-id',
    itemSection: 'data-cnstrc-item-section',
    itemGroup: 'data-cnstrc-item-group',
    slCampaignId: 'data-cnstrc-sl-campaign-id',
    slCampaignOwner: 'data-cnstrc-sl-campaign-owner',
    section: 'data-cnstrc-section',
  },
  autocomplete: {
    input: 'data-cnstrc-search-input',
    inputForm: 'data-cnstrc-search-form',
    searchSubmitButton: 'data-cnstrc-search-submit-btn',
    autocompleteContainer: 'data-cnstrc-autosuggest',
  },
  recommendations: {
    recommendationsContainer: 'data-cnstrc-recommendations',
    recommendationsPodId: 'data-cnstrc-recommendations-pod-id',
    item: 'data-cnstrc-item',
    strategyId: 'data-cnstrc-strategy-id',
    seedItems: 'data-cnstrc-recommendations-seed-items',
  },
  custom: {
    customSection: 'data-cnstrc-custom-section',
    customSectionName: 'data-cnstrc-custom-section-name',
  },
};

export interface CnstrcDataAttrs {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Normalize itemIds to array format for seed items
 */
export function normalizeSeedItems(itemIds?: string | string[]): string[] | undefined {
  if (!itemIds) return undefined;
  return Array.isArray(itemIds) ? itemIds : [itemIds];
}

/**
 * Get data attributes for autocomplete/recommendation items
 *
 * @param item - The item to generate data attributes for
 * @returns An object containing data attributes to be spread onto the element
 *
 * @example
 * ```tsx
 * // For autocomplete items
 * const itemProps = getItemCnstrcDataAttributes(searchSuggestionItem);
 * <li {...itemProps}>Search Suggestion</li>
 *
 * // For recommendation items
 * const recItemProps = getItemCnstrcDataAttributes(recommendationItem);
 * <div {...recItemProps}>Recommended Product</div>
 * ```
 */
export function getItemCnstrcDataAttributes(item: Item): CnstrcDataAttrs {
  const dataCnstrc: CnstrcDataAttrs = {
    [cnstrcDataAttrs.common.itemSection]: item.section,
    [cnstrcDataAttrs.common.itemName]: item.value,
  };

  // Add item ID only for non-Search Suggestions
  if (!isSearchSuggestion(item) && item.data?.id) {
    dataCnstrc[cnstrcDataAttrs.common.itemId] = item.data.id;
  }

  // Add variation ID if exists
  if (item.data?.variation_id) {
    dataCnstrc[cnstrcDataAttrs.common.variationId] = item.data.variation_id;
  }

  // Add group ID for in-group suggestions
  if (isInGroupSuggestion(item)) {
    dataCnstrc[cnstrcDataAttrs.common.itemGroup] = item.groupId;
  }

  // Add recommendation-specific attributes (check if item has podId and strategy)
  if (item.podId && item.strategy) {
    dataCnstrc[cnstrcDataAttrs.recommendations.item] = 'recommendation';

    // Add strategy ID if available
    if (item.strategy.id) {
      dataCnstrc[cnstrcDataAttrs.recommendations.strategyId] = item.strategy.id;
    }
  }

  // Add sponsored listing data if available
  if (item.labels?.sl_campaign_id) {
    dataCnstrc[cnstrcDataAttrs.common.slCampaignId] = String(item.labels.sl_campaign_id);
  }

  if (item.labels?.sl_campaign_owner) {
    dataCnstrc[cnstrcDataAttrs.common.slCampaignOwner] = String(item.labels.sl_campaign_owner);
  }

  return dataCnstrc;
}

/**
 * Get data attributes for recommendation sections
 */
export function getRecommendationsSectionCnstrcDataAttributes(
  section: Section,
  resultId?: string,
  numResults?: number,
  seedItems?: string[]
): CnstrcDataAttrs {
  if (!isRecommendationsSection(section)) {
    return {};
  }

  const dataCnstrc: CnstrcDataAttrs = {
    [cnstrcDataAttrs.recommendations.recommendationsContainer]: true,
    [cnstrcDataAttrs.recommendations.recommendationsPodId]: section.podId,
  };

  // Add result ID if available
  if (resultId) {
    dataCnstrc[cnstrcDataAttrs.common.resultId] = resultId;
  }

  // Add number of results
  if (numResults !== undefined) {
    dataCnstrc[cnstrcDataAttrs.common.numResults] = numResults;
  }

  // Add seed items if available
  if (seedItems && seedItems.length > 0) {
    dataCnstrc[cnstrcDataAttrs.recommendations.seedItems] = seedItems.join(',');
  }

  return dataCnstrc;
}

export type ConversionType =
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'like'
  | 'message'
  | 'make_offer'
  | 'read'
  | string;

/**
 * Get data attributes for conversion buttons
 *
 * @example
 * ```tsx
 * <button {...getConversionButtonCnstrcDataAttributes('add_to_cart')}>
 *   Add to Cart
 * </button>
 * ```
 */
export function getConversionButtonCnstrcDataAttributes(
  conversionType: ConversionType
): CnstrcDataAttrs {
  return {
    [cnstrcDataAttrs.common.conversionBtn]: conversionType,
  };
}
