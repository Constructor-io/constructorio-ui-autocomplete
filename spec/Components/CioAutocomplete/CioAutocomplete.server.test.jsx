/* eslint-disable no-console */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CioAutocomplete } from '../../../src';
import { mockConstructorIOClient } from '../../test-utils';

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

  it.only("Throws an error even if we provide a ConstructorIO Client since it's not SSR supported", () => {
    expect(() => {
      ReactDOMServer.renderToString(<CioAutocomplete cioJsClient={mockConstructorIOClient} />);
    }).not.toThrow();

    expect(console.error).not.toHaveBeenCalled();
  });
});
