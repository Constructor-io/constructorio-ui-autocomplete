import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CioAutocompleteProvider from '../CioAutocompleteProvider';
import AutocompleteResults from './AutocompleteResults';

function renderWithProvider(ui, { sectionOrder = ['Search Suggestions'] } = {}) {
  const Wrapper = ({ children }) => <CioAutocompleteProvider sectionOrder={sectionOrder}>{children}</CioAutocompleteProvider>
  return render(ui, { wrapper: Wrapper })
}

test("Autocomplete Results has correct attributes", () => {
  const { container } = renderWithProvider(<AutocompleteResults />)
  expect(container.querySelector(`.cio-results`)).toHaveAttribute('data-testid');
  expect(screen.getByTestId('cio-results')).toHaveClass('cio-results');
});