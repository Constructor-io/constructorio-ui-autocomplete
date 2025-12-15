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
      const productUrl = event.item.data?.url;

      if (productUrl) {
        let url: URL;
        try {
          url = new URL(productUrl);
        } catch {
          url = new URL(productUrl, location.origin);
        }

        const currentParams = new URLSearchParams(location.search);
        currentParams.forEach((value, key) => {
          if (!url.searchParams.has(key)) {
            url.searchParams.set(key, value);
          }
        });

        window.location.href = url.toString();
      }

      return;
    }

    /* Handle redirecting to a search page */
    let query = '';

    if (!isAutocompleteSelectSubmit(event) && event.query) {
      query = event.query;
    }

    if (isAutocompleteSelectSubmit(event) && event.item.section === 'Search Suggestions') {
      query = event.item.value;
    }

    if (!query) {
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const shopifySearchUrl = shopifySettings?.searchUrl || '';

    queryParams.set('q', query);
    window.location.href = location.origin + shopifySearchUrl + '?' + queryParams.toString();
  },
};
