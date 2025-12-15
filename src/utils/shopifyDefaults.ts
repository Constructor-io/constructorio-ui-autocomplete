import type { CioAutocompleteProps, AutocompleteSubmitEvent, ShopifySettings } from '../types';
import { isAutocompleteSelectSubmit } from '../types';

/**
 * Shopify-specific default configurations for the autocomplete component.
 *
 * These defaults are designed to work seamlessly with Shopify themes and handle
 * navigation patterns common in Shopify stores.
 */
export interface ShopifyDefaults {
  onSubmit: NonNullable<CioAutocompleteProps['onSubmit']>;
}

// eslint-disable-next-line import/prefer-default-export
export const shopifyDefaults: ShopifyDefaults = {
  onSubmit(event: AutocompleteSubmitEvent, shopifySettings: ShopifySettings | undefined) {
    /* Handle redirecting to a product page */
    if (isAutocompleteSelectSubmit(event) && event.item.section === 'Products') {
      var productUrl = event.item.data?.url;

      if (productUrl) {
        if (productUrl.includes('http')) {
          // absolute url
          window.location.href = productUrl + location.search;
        } else {
          // relative url
          window.location.href = location.origin + productUrl + location.search;
        }
      }

      return;
    }

    /* Handle redirecting to a search page */
    var query = '';

    if (!isAutocompleteSelectSubmit(event) && event.query) {
      query = event.query;
    }

    if (isAutocompleteSelectSubmit(event) && event.item.section === 'Search Suggestions') {
      query = event.item.value;
    }

    if (!query) {
      return;
    }

    var queryParams = new URLSearchParams(location.search);
    queryParams.set('q', query);
    window.location.href =
      location.origin + shopifySettings?.searchUrl + '?' + queryParams.toString();
  },
};
