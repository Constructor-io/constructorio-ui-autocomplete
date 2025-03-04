/* eslint-disable no-console */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CioAutocomplete } from '../../../src';
import { mockCioClientJS } from '../../test-utils';
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
      window.sessionStorage.removeItem('_constructorio_custom_autosuggest_ui_');
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
        '_constructorio_custom_autosuggest_ui_',
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

      const options = (await screen.findAllByRole('option')).filter(
        (elem) => elem.getAttribute('data-cnstrc-item-section') === 'Search Suggestions'
      );

      options.forEach((option) => {
        const suggestionCount = option.querySelector('.cio-suggestion-count');
        expect(suggestionCount).toBeInTheDocument();
      });
    });
  });
});
