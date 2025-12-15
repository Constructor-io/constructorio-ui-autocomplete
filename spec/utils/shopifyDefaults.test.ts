import { shopifyDefaults } from '../../src/utils/shopifyDefaults';
import type { AutocompleteSubmitEvent, ShopifySettings } from '../../src/types';

describe('shopifyDefaults', () => {
  const originalLocation = window.location;
  const mockShopifySettings: ShopifySettings = {
    searchUrl: '/search',
  };

  beforeEach(() => {
    // Mock window.location with plain object to avoid URL validation
    delete (window as any).location;
    (window as any).location = {
      href: 'https://store.myshopify.com/pages/home',
      origin: 'https://store.myshopify.com',
      search: '?extraQueryParam=value',
    };
  });

  afterEach(() => {
    (window as any).location = originalLocation;
  });

  describe('shopifyDefaults', () => {
    it('should return an object with shopify defaults', () => {
      expect(shopifyDefaults).toHaveProperty('onSubmit');
    });
  });

  describe('onSubmit', () => {
    describe('Product selection navigation', () => {
      it('Redirects to product page with absolute URL', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Products',
            value: 'Blue Shirt',
            data: { url: 'https://store.myshopify.com/products/blue-shirt' },
          },
          originalQuery: 'shirt',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toBe(
          'https://store.myshopify.com/products/blue-shirt?extraQueryParam=value'
        );
      });

      it('Redirects to product page with relative URL', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Products',
            value: 'Red Shirt',
            data: { url: '/products/red-shirt' },
          },
          originalQuery: 'shirt',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toBe(
          'https://store.myshopify.com/products/red-shirt?extraQueryParam=value'
        );
      });

      it('Does not redirect when product has no URL', () => {
        const initialHref = window.location.href;

        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Products',
            value: 'Product Without URL',
            data: {},
          },
          originalQuery: 'product',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toBe(initialHref);
      });

      it('Handles product URL with existing query parameters', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Products',
            value: 'Product',
            data: { url: '/products/item?variant=123' },
          },
          originalQuery: 'product',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toBe(
          'https://store.myshopify.com/products/item?variant=123&extraQueryParam=value'
        );
      });
    });

    describe('Search Suggestion selection navigation', () => {
      it('Redirects to search page when search suggestion is selected', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Search Suggestions',
            value: 'blue shirt',
          },
          originalQuery: 'shirt',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toContain('/search');
        expect(window.location.href).toContain('q=blue+shirt');
        expect(window.location.href).toContain('extraQueryParam=value');
      });

      it('Preserves existing query parameters when redirecting to search', () => {
        (window as any).location.search = '?existing=param&another=value';

        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Search Suggestions',
            value: 'winter jacket',
          },
          originalQuery: 'jacket',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toContain('q=winter+jacket');
        expect(window.location.href).toContain('existing=param');
        expect(window.location.href).toContain('another=value');
      });

      it('Handles empty search suggestion value', () => {
        const initialHref = window.location.href;

        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Search Suggestions',
            value: '',
          },
          originalQuery: 'test',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        // Should not redirect with empty value
        expect(window.location.href).toBe(initialHref);
      });
    });

    describe('Manual search submission navigation', () => {
      it('Redirects to search page when user submits manual query', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          query: 'red shoes',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toContain('/search');
        expect(window.location.href).toContain('q=red+shoes');
        expect(window.location.href).toContain('extraQueryParam=value');
      });

      it('Does not redirect when query is empty', () => {
        const initialHref = window.location.href;

        const mockEvent: AutocompleteSubmitEvent = {
          query: '',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toBe(initialHref);
      });

      it('Handles special characters in search query', () => {
        const mockEvent: AutocompleteSubmitEvent = {
          query: 'shoes & boots',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        expect(window.location.href).toContain('q=shoes+%26+boots');
      });
    });

    describe('Edge cases', () => {
      it('Handles item selection from non-Product, non-Search Suggestion sections', () => {
        const initialHref = window.location.href;

        const mockEvent: AutocompleteSubmitEvent = {
          item: {
            section: 'Custom Section',
            value: 'Custom Item',
            data: { url: '/custom/path' },
          },
          originalQuery: 'custom',
        } as any;

        shopifyDefaults.onSubmit(mockEvent, mockShopifySettings);

        // Custom sections don't match Products or Search Suggestions, so no redirect happens
        expect(window.location.href).toBe(initialHref);
      });
    });
  });
});
