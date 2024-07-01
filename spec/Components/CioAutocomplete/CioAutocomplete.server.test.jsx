/* eslint-disable no-console */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CioAutocomplete } from '../../../src';
import { mockCioClientJS } from '../../test-utils';
import { apiKey as DEMO_API_KEY } from '../../../src/constants';

describe('CioAutocomplete Server-Side Rendering', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Does not throw an error when provided API key (JS CioClient is null)', () => {
    expect(() => {
      ReactDOMServer.renderToString(<CioAutocomplete apiKey={DEMO_API_KEY} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });

  it('Throws an error when passed a JS CioClient without clientId and sessionId', () => {
    expect(() => {
      ReactDOMServer.renderToString(<CioAutocomplete cioJsClient={mockCioClientJS()} />);
    }).toThrow('sessionId is a required user parameter of type number');
  });

  it('Throws an error when passed a JS CioClient without clientId', () => {
    expect(() => {
      ReactDOMServer.renderToString(
        <CioAutocomplete cioJsClient={mockCioClientJS({ sessionId: 1 })} />
      );
    }).toThrow('clientId is a required user parameter of type string');
  });

  it('Does not throw an error when passed a JS CioClient with clientId and sessionId', () => {
    expect(() => {
      ReactDOMServer.renderToString(
        <CioAutocomplete cioJsClient={mockCioClientJS({ sessionId: 1, clientId: '1' })} />
      );
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });
});

it('Render custom placeholder when passed as a prop', () => {
  const html = ReactDOMServer.renderToString(
    <CioAutocomplete apiKey={DEMO_API_KEY} placeholder='Custom placeholder text' />
  );

  expect(html).toContain('Custom placeholder text');
});

it('Accepts custom styles when passed as a prop', () => {
  const html = ReactDOMServer.renderToString(
    <CioAutocomplete
      apiKey={DEMO_API_KEY}
      autocompleteClassName='cio-autocomplete custom-autocomplete-styles'
    />
  );
  expect(html).toContain('custom-autocomplete-styles');
});
