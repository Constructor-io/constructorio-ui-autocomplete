/* eslint-disable no-console */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CioAutocomplete } from '../../../src';
import { mockCioClientJS } from '../../test-utils';
import * as helpers from '../../../src/utils/helpers';
import { apiKey as DEMO_API_KEY, onSubmitDefault as onSubmit } from '../../../src/constants';
import { cnstrcDataAttrs } from '../../../src/utils/dataAttributeHelpers';

/**
 * Helper function to verify recommendation item attributes
 */
function verifyRecommendationItemAttributes(item: Element) {
  expect(item).toHaveAttribute(cnstrcDataAttrs.recommendations.item, 'recommendation');
  expect(item).toHaveAttribute(cnstrcDataAttrs.common.itemSection);
  expect(item).toHaveAttribute(cnstrcDataAttrs.common.itemName);
  expect(item).toHaveAttribute(cnstrcDataAttrs.common.itemId);
  expect(item).toHaveAttribute(cnstrcDataAttrs.recommendations.strategyId);
}

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

  describe('Data attributes', () => {
    it('Adds required form, input, and submit button attributes', () => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={onSubmit} />);

      const form = screen.getByTestId('cio-form');
      expect(form).toHaveAttribute(cnstrcDataAttrs.autocomplete.inputForm);

      const searchInput = screen.getByRole('combobox');
      expect(searchInput).toHaveAttribute(cnstrcDataAttrs.autocomplete.input);

      const submitButton = screen.getByTestId('cio-submit-btn');
      expect(submitButton).toHaveAttribute(cnstrcDataAttrs.autocomplete.searchSubmitButton);
    });

    it('Adds autocomplete container and item attributes', async () => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={onSubmit} />);

      const searchInput = screen.getByRole('combobox');
      fireEvent.change(searchInput, { target: { value: 'shirt' } });

      // Test autocomplete container
      const resultsContainer = await screen.findByTestId('cio-results', undefined, {
        timeout: 5000,
      });
      expect(resultsContainer).toHaveAttribute(cnstrcDataAttrs.autocomplete.autocompleteContainer);

      // Get all options
      const allOptions = await screen.findAllByRole('option', undefined, { timeout: 5000 });

      // Test Search Suggestion items
      const searchSuggestions = allOptions.filter(
        (elem) => elem.getAttribute(cnstrcDataAttrs.common.itemSection) === 'Search Suggestions'
      );

      expect(searchSuggestions.length).toBeGreaterThan(0);
      searchSuggestions.forEach((option) => {
        expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemSection, 'Search Suggestions');
        expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemName);
        // Should NOT have item-id for Search Suggestions
        expect(option).not.toHaveAttribute(cnstrcDataAttrs.common.itemId);
      });

      // Test Product items
      const productItems = allOptions.filter(
        (elem) => elem.getAttribute(cnstrcDataAttrs.common.itemSection) === 'Products'
      );

      expect(productItems.length).toBeGreaterThan(0);
      productItems.forEach((option) => {
        expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemSection, 'Products');
        expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemName);
        expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemId);
      });
    });

    it('Does NOT add variation-id when not present', async () => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} onSubmit={onSubmit} />);

      const searchInput = screen.getByRole('combobox');
      fireEvent.change(searchInput, { target: { value: 'shirt' } });

      const allOptions = await screen.findAllByRole('option', undefined, { timeout: 5000 });

      // Test that variation_id is NOT added when not present
      const optionsWithoutVariation = allOptions.filter(
        (elem) => !elem.hasAttribute(cnstrcDataAttrs.common.variationId)
      );
      expect(optionsWithoutVariation.length).toBeGreaterThan(0);
    });

    it('Adds data-cnstrc-item-group for in-group suggestions when available', async () => {
      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          onSubmit={onSubmit}
          advancedParameters={{
            numTermsWithGroupSuggestions: 2,
            numGroupsSuggestedPerTerm: 2,
          }}
        />
      );

      const searchInput = screen.getByRole('combobox');
      fireEvent.change(searchInput, { target: { value: 'shirt' } });

      const options = await screen.findAllByRole('option', undefined, { timeout: 5000 });

      const inGroupSuggestions = options.filter(
        (elem) =>
          elem.getAttribute(cnstrcDataAttrs.common.itemSection) === 'Search Suggestions' &&
          elem.hasAttribute(cnstrcDataAttrs.common.itemGroup)
      );

      // Get all search suggestions
      const allSearchSuggestions = options.filter(
        (elem) => elem.getAttribute(cnstrcDataAttrs.common.itemSection) === 'Search Suggestions'
      );

      expect(allSearchSuggestions.length).toBeGreaterThan(0);

      // Verify in-group suggestions have the data-cnstrc-item-group attribute
      if (inGroupSuggestions.length > 0) {
        inGroupSuggestions.forEach((option) => {
          expect(option).toHaveAttribute(cnstrcDataAttrs.common.itemGroup);
          // Verify the group ID is a non-empty string
          expect(option.getAttribute(cnstrcDataAttrs.common.itemGroup)).toBeTruthy();
        });
      }

      // Verify that items without group ID do NOT have the group attribute
      const regularSuggestions = options.filter(
        (elem) =>
          elem.getAttribute(cnstrcDataAttrs.common.itemSection) === 'Search Suggestions' &&
          !elem.hasAttribute(cnstrcDataAttrs.common.itemGroup)
      );

      // If there are regular suggestions, they should not have the group attribute
      if (regularSuggestions.length > 0) {
        regularSuggestions.forEach((option) => {
          expect(option).not.toHaveAttribute(cnstrcDataAttrs.common.itemGroup);
        });
      }
    });

    it('Adds recommendation data attributes to zero-state sections', async () => {
      render(
        <CioAutocomplete
          apiKey={DEMO_API_KEY}
          onSubmit={onSubmit}
          openOnFocus
          zeroStateSections={[
            {
              type: 'recommendations',
              podId: 'bestsellers',
              indexSectionName: 'Products',
              numResults: 5,
            },
          ]}
        />
      );

      const searchInput = screen.getByRole('combobox');
      fireEvent.focus(searchInput);

      // Wait for recommendation section to appear
      const recommendationSection = await screen.findByTestId(
        'cio-results',
        {},
        { timeout: 5000 }
      );

      // Wait for recommendation container to load within the section
      const recommendationContainer = await waitFor(
        () => {
          const container = recommendationSection.querySelector(
            `[${cnstrcDataAttrs.recommendations.recommendationsContainer}]`
          );
          expect(container).not.toBeNull();
          return container!;
        },
        { timeout: 5000 }
      );

      // Verify container has required recommendation attributes
      expect(recommendationContainer).toHaveAttribute(cnstrcDataAttrs.recommendations.recommendationsContainer);
      expect(recommendationContainer).toHaveAttribute(
        cnstrcDataAttrs.recommendations.recommendationsPodId,
        'bestsellers'
      );

      // Verify result-id and num-results are present
      expect(recommendationContainer).toHaveAttribute(cnstrcDataAttrs.common.resultId);
      expect(recommendationContainer).toHaveAttribute(cnstrcDataAttrs.common.numResults);

      // Check recommendation items
      const recommendationItems = recommendationContainer?.querySelectorAll(
        `[${cnstrcDataAttrs.recommendations.item}="recommendation"]`
      );

      if (recommendationItems && recommendationItems.length > 0) {
        // Verify at least one item has all required attributes
        const firstItem = recommendationItems[0];
        verifyRecommendationItemAttributes(firstItem);
      }
    });
  });
});
