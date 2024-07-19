/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import { CioAutocomplete } from '../../../src';

describe('CioAutocomplete React Client-Side Rendering', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Logs an error if apiKey or cioJsClient isn't provided", () => {
    // @ts-ignore
    render(<CioAutocomplete />);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Either apiKey or cioJsClient is required')
    );
  });
});
