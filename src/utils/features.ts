import { AutocompleteRequestType } from '@constructor-io/constructorio-client-javascript';
import { storageGetItem } from './storage';

const AUTOSUGGEST_CUSTOM_UI_VARIANTS = [
  'custom_autosuggest_ui_result_count',
  'custom_autosuggest_ui_image',
  'custom_autosuggest_ui_image_result_count',
  'custom_autosuggest_ui_disable_recommendations_in_zero_state',
];

export type CustomAutosuggestUiVariant = (typeof AUTOSUGGEST_CUSTOM_UI_VARIANTS)[number];

const AUTOSUGGEST_CUSTOM_UI_STORAGE_KEY = {
  scope: 'session',
  key: '_constructorio_custom_autosuggest_ui_',
};

const isCustomAutosuggestUiVariant = (variant: string): variant is CustomAutosuggestUiVariant =>
  AUTOSUGGEST_CUSTOM_UI_VARIANTS.includes(variant);

const getCustomUiVariantFromStorage = (): CustomAutosuggestUiVariant | null => {
  const item = storageGetItem(AUTOSUGGEST_CUSTOM_UI_STORAGE_KEY);
  return item && isCustomAutosuggestUiVariant(item) ? item : null;
};

// eslint-disable-next-line import/prefer-default-export
export function getFeatures(request: Partial<AutocompleteRequestType>) {
  let featureDisplaySearchSuggestionImages = false;
  let featureDisplaySearchSuggestionResultCounts = false;
  let featureDisplayZeroStateRecommendations = true;
  let customAutosuggestUi: CustomAutosuggestUiVariant | null = null;

  if (
    request?.features?.custom_autosuggest_ui === true &&
    isCustomAutosuggestUiVariant(request?.feature_variants?.custom_autosuggest_ui)
  ) {
    customAutosuggestUi = request?.feature_variants?.custom_autosuggest_ui ?? null;
  }

  // If a variant is set in the session storage, override the request variant
  const customVariantFromStorage = getCustomUiVariantFromStorage();
  if (customVariantFromStorage) {
    customAutosuggestUi = customVariantFromStorage;
  }

  if (customAutosuggestUi !== null) {
    switch (customAutosuggestUi) {
      case 'custom_autosuggest_ui_result_count':
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      case 'custom_autosuggest_ui_image':
        featureDisplaySearchSuggestionImages = true;
        break;
      case 'custom_autosuggest_ui_image_result_count':
        featureDisplaySearchSuggestionImages = true;
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      case 'custom_autosuggest_ui_disable_recommendations_in_zero_state':
        featureDisplayZeroStateRecommendations = false;
        break;
      default:
        break;
    }
  }

  return {
    featureDisplaySearchSuggestionImages,
    featureDisplaySearchSuggestionResultCounts,
    featureDisplayZeroStateRecommendations,
  };
}
