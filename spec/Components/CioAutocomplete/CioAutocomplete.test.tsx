/* eslint-disable no-console */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CioAutocomplete } from '../../../src';
import { mockCioClientJS } from '../../test-utils';
import * as helpers from '../../../src/utils/helpers';
import { apiKey as DEMO_API_KEY, onSubmitDefault as onSubmit } from '../../../src/constants';

describe('CioAutocomplete Client-Side Rendering', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("Logs an error if apiKey or cioJsClient isn't provided", () => {
    // @ts-ignore
    render(<CioAutocomplete />);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Either apiKey or cioJsClient is required')
    );
  });

  it("Doesn't throw error if we provide an API key", () => {
    expect(() => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={() => {}} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it("Doesn't throw error if we provide a ConstructorIO Client", () => {
    expect(() => {
      render(<CioAutocomplete cioJsClient={mockCioClientJS()} onSubmit={() => {}} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it("Doesn't throw error if we provide a CIOClientOptions", () => {
    const cioJsClientOptions = { apiKey: DEMO_API_KEY, serviceUrl: 'https://ac.cnstrc.com' };

    expect(() => {
      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          cioJsClientOptions={cioJsClientOptions}
          onSubmit={() => {}}
        />
      );
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it('Supports cioJsClientOptions for backwards compatibility', async () => {
    // Spy on getCioClient to verify cioJsClientOptions are used
    const getCioClientSpy = jest.spyOn(helpers, 'getCioClient');

    const cioJsClientOptions = {
      apiKey: DEMO_API_KEY,
      serviceUrl: 'https://legacy-service.cnstrc.com',
    };

    render(
      <CioAutocomplete
        apiKey={DEMO_API_KEY}
        cioJsClientOptions={cioJsClientOptions}
        onSubmit={() => {}}
      />
    );

    // Verify getCioClient was called with cioJsClientOptions
    expect(getCioClientSpy).toHaveBeenCalledWith(
      DEMO_API_KEY,
      expect.objectContaining({
        serviceUrl: 'https://legacy-service.cnstrc.com',
      })
    );

    getCioClientSpy.mockRestore();
  });

  it('Render custom placeholder when passed as a prop', () => {
    const { getByPlaceholderText } = render(
      <CioAutocomplete
        apiKey={DEMO_API_KEY}
        placeholder='Custom placeholder text'
        onSubmit={() => {}}
      />
    );

    expect(getByPlaceholderText('Custom placeholder text')).toBeInTheDocument();
  });

  it('Accepts custom styles when passed as a prop', () => {
    const { container } = render(
      <CioAutocomplete
        apiKey={DEMO_API_KEY}
        autocompleteClassName='cio-autocomplete custom-autocomplete-styles'
        onSubmit={() => {}}
      />
    );

    expect(container.querySelector('.custom-autocomplete-styles')).toBeInTheDocument();
  });

  it("Fully featured example doesn't throw an error", () => {
    enum Type {
      recommendations = 'recommendations',
    }

    const props = {
      cioJsClient: mockCioClientJS(),
      onSubmit,
      autocompleteClassName: '',
      placeholder: 'What can we help you find?',
      advancedParameters: {
        displaySearchSuggestionImages: true,
        displaySearchSuggestionResultCounts: true,
        numTermsWithGroupSuggestions: 6,
      },
      sections: [
        {
          indexSectionName: 'Search Suggestions',
          numResults: 8,
          displaySearchTermHighlights: true,
        },
        {
          indexSectionName: 'Products',
          numResults: 6,
          displaySearchTermHighlights: true,
        },
      ],
      zeroStateSections: [
        {
          podId: 'bestsellers',
          type: Type.recommendations,
          numResults: 6,
        },
      ],
    };

    expect(() => {
      render(<CioAutocomplete {...props} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });
  describe('Custom UI variant', () => {
    afterEach(() => {
      window.sessionStorage.removeItem('_constructorio_custom_autosuggest_ui');
    });

    it('Renders the default CioAutocomplete when no custom UI variant is set', async () => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={() => {}} />);

      const searchInput = screen.getByRole('combobox');

      fireEvent.change(searchInput, { target: { value: 'pants' } });

      const options = (await screen.findAllByRole('option', undefined, { timeout: 5000 })).filter(
        (elem) => elem.getAttribute('data-cnstrc-item-section') === 'Search Suggestions'
      );

      options.forEach((option) => {
        const suggestionCount = option.querySelector('.cio-suggestion-count');
        expect(suggestionCount).not.toBeInTheDocument();
      });
    });

    it('Takes custom UI variant from session storage and applies features based on the variant', async () => {
      window.sessionStorage.setItem(
        '_constructorio_custom_autosuggest_ui',
        'custom_autosuggest_ui_result_count'
      );

      const props = {
        apiKey: DEMO_API_KEY,
        onSubmit: () => {},
        sections: [
          {
            indexSectionName: 'Search Suggestions',
            numResults: 8,
          },
          {
            indexSectionName: 'Products',
            numResults: 6,
          },
        ],
      };

      render(<CioAutocomplete {...props} />);

      const searchInput = screen.getByRole('combobox');

      fireEvent.change(searchInput, { target: { value: 'pants' } });

      const options = (await screen.findAllByRole('option', undefined, { timeout: 5000 })).filter(
        (elem) => elem.getAttribute('data-cnstrc-item-section') === 'Search Suggestions'
      );

      options.forEach((option) => {
        const suggestionCount = option.querySelector('.cio-suggestion-count');
        expect(suggestionCount).toBeInTheDocument();
      });
    });

    it('Applies features sent in advancedParameters even if a custom UI variant is set that affects that feature', async () => {
      window.sessionStorage.setItem(
        '_constructorio_custom_autosuggest_ui',
        'custom_autosuggest_ui_result_count'
      );

      const props = {
        apiKey: DEMO_API_KEY,
        onSubmit: () => {},
        sections: [
          {
            indexSectionName: 'Search Suggestions',
            numResults: 8,
          },
          {
            indexSectionName: 'Products',
            numResults: 6,
          },
        ],
        advancedParameters: {
          displaySearchSuggestionResultCounts: false,
        },
      };

      render(<CioAutocomplete {...props} />);

      const searchInput = screen.getByRole('combobox');

      fireEvent.change(searchInput, { target: { value: 'pants' } });

      const options = (await screen.findAllByRole('option', undefined, { timeout: 5000 })).filter(
        (elem) => elem.getAttribute('data-cnstrc-item-section') === 'Search Suggestions'
      );

      options.forEach((option) => {
        const suggestionCount = option.querySelector('.cio-suggestion-count');
        expect(suggestionCount).not.toBeInTheDocument();
      });
    });
  });

  describe('Search button behavior', () => {
    it('Focuses the input when search button is clicked with empty input', () => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={() => {}} />);

      const searchInput = screen.getByRole('combobox') as HTMLInputElement;
      const searchButton = screen.getByTestId('cio-submit-btn');

      expect(searchInput).not.toHaveFocus();

      fireEvent.click(searchButton);

      expect(searchInput).toHaveFocus();
    });

    it('Submits the form when search button is clicked with non-empty input', () => {
      const mockOnSubmit = jest.fn();
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={mockOnSubmit} />);

      const searchInput = screen.getByRole('combobox');
      const searchButton = screen.getByTestId('cio-submit-btn');

      fireEvent.change(searchInput, { target: { value: 'test query' } });
      fireEvent.click(searchButton);

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('shopifyDefaults', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      // Mock window.location for Shopify tests
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

    it('Custom onSubmit overrides shopifyDefaults onSubmit when provided', async () => {
      const customOnSubmit = jest.fn();

      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          cioJsClient={mockCioClientJS()}
          useShopifyDefaults={true}
          shopifySettings={{ searchUrl: '/search' }}
          onSubmit={customOnSubmit}
        />
      );

      const searchInput = screen.getByRole('combobox');
      const searchForm = screen.getByTestId('cio-form');

      fireEvent.change(searchInput, { target: { value: 'test query' } });
      fireEvent.submit(searchForm);

      // Custom onSubmit should be called even when useShopifyDefaults is true
      expect(customOnSubmit).toHaveBeenCalledWith({ query: 'test query' });

      // Window.location should NOT be updated since custom onSubmit overrides Shopify defaults
      expect(window.location.href).not.toContain('q=test+query');
    });

    it('Uses shopifyDefaults.onSubmit when useShopifyDefaults is true and no custom onSubmit provided', async () => {
      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          cioJsClient={mockCioClientJS()}
          useShopifyDefaults={true}
          shopifySettings={{ searchUrl: '/search' }}
        />
      );

      const searchInput = screen.getByRole('combobox');
      const searchForm = screen.getByTestId('cio-form');

      fireEvent.change(searchInput, { target: { value: 'test query' } });
      fireEvent.submit(searchForm);

      // Window.location should be updated with Shopify defaults
      expect(window.location.href).toContain('q=test+query');
      expect(window.location.href).toContain('/search');
    });

    it('Uses custom onSubmit when useShopifyDefaults is false', async () => {
      const customOnSubmit = jest.fn();

      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          cioJsClient={mockCioClientJS()}
          useShopifyDefaults={false}
          onSubmit={customOnSubmit}
        />
      );

      const searchInput = screen.getByRole('combobox');
      const searchForm = screen.getByTestId('cio-form');

      fireEvent.change(searchInput, { target: { value: 'test query' } });
      fireEvent.submit(searchForm);

      expect(customOnSubmit).toHaveBeenCalledWith({ query: 'test query' });
    });
  });
});
