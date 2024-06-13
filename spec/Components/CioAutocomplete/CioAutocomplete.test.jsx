import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CioAutocomplete } from '../../../src';

describe('CioAutocomplete React Client-Side Rendering', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("Logs an error if apiKey or cioJsClient isn't provided", () => {
    render(<CioAutocomplete />);

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Either apiKey or cioJsClient is required'));
  });
});