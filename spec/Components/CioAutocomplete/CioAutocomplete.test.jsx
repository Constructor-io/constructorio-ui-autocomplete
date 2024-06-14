/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CioAutocomplete } from '../../../src';
import { mockConstructorIOClient } from '../../test-utils';
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
    render(<CioAutocomplete />);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Either apiKey or cioJsClient is required')
    );
  });

  it("Doesn't throw error if we provide an API key", () => {
    expect(() => {
      render(<CioAutocomplete apiKey={DEMO_API_KEY} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it("Doesn't throw error if we provide a ConstructorIO Client", () => {
    expect(() => {
      render(<CioAutocomplete cioJsClient={mockConstructorIOClient} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it("Doesn't throw error if we provide a CIOClientOptions Client", () => {
    const cioJsClientOptions = { apiKey: DEMO_API_KEY, serviceUrl: 'https://ac.cnstrc.com' };

    expect(() => {
      render(
        <CioAutocomplete
          cioJsClientOptions={cioJsClientOptions}
          cioJsClient={mockConstructorIOClient}
        />
      );
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it('Render custom place holder when passed as a prop', () => {
    const { getByPlaceholderText } = render(
      <CioAutocomplete apiKey={DEMO_API_KEY} placeholder='Custom placeholder text' />
    );

    expect(getByPlaceholderText('Custom placeholder text')).toBeInTheDocument();
  });

  it('Accepts custom styles when passed as a prop', () => {
    const { container } = render(
      <CioAutocomplete
        apiKey={DEMO_API_KEY}
        autocompleteClassName='cio-autocomplete custom-autocomplete-styles'
      />
    );

    expect(container.querySelector('.custom-autocomplete-styles')).toBeInTheDocument();
  });

  it("Fully featured example doesn't throw an error", () => {
    const props = {
      cioJsClient: mockConstructorIOClient,
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
          type: 'recommendations',
          numResults: 6,
        },
      ],
    };

    expect(() => {
      render(<CioAutocomplete {...props} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });
});
