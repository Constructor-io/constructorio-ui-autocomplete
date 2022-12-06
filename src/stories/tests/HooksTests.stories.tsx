import { ComponentMeta } from '@storybook/react';

import CioAutocomplete from '../../components/Autocomplete/CioAutocomplete';
import { codeSnippet } from '../../snippets';
import { SectionItemsList } from '../../components';
import { SectionItem } from '../../components';
import { argTypes } from '../Autocomplete/argTypes';
import { CioAutocompleteProps } from '../../components/Autocomplete/CioAutocompleteProvider';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { isTrackingRequestSent, sleep } from '../../utils';
import { Hook, HooksZeroState } from '../Autocomplete/AutocompleteHook.stories';

const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Autocomplete/Hook/Interaction Tests',
  component: CioAutocomplete,
  subcomponents: { SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        code: codeSnippet,
        language: 'jsx',
        format: true,
        type: 'code'
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

const defaultArgs: CioAutocompleteProps = {
  apiKey,
  sectionConfigurations: [],
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};

export const RenderAutocompleteDefaultState = Hook.bind({});

// - No Interaction => Correctly render default state
RenderAutocompleteDefaultState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
  expect(canvas.getByTestId('cio-input')).toHaveAttribute('placeholder');
  expect(canvas.getByPlaceholderText('What can we help you find today?')).toBeInTheDocument();
};

// - focus in input field => network tracking event
export const FocusFiresTrackingEvent = Hook.bind({});
FocusFiresTrackingEvent.play = async ({ canvasElement }) => {
  await sleep(100);
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  const isFocusTrackingRequestSent = isTrackingRequestSent('action=focus');
  expect(isFocusTrackingRequestSent).toBeTruthy();
};

// - focus in input field (with no zeroStateSections) => render no autocomplete sections
export const FocusNoZeroStateShowNoResults = Hook.bind({});
FocusNoZeroStateShowNoResults.play = async ({ canvasElement }) => {
  await sleep(100);
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
};

// - type search term => render term suggestions and products section
export const TypeSearchTermRenderSearchSuggestions = Hook.bind({});
TypeSearchTermRenderSearchSuggestions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);

  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productImageElement = canvas.getAllByTestId('cio-img')?.[0];
  expect(canvas.getAllByTestId('cio-item-Products')[0]).toContainElement(productImageElement);
};

// - select term suggestion => network tracking event
// - select term suggestion => network search submit event
// - select term suggestion => update input to match clicked term
export const SelectTermSuggestionFiresTrackingAndFillInput = Hook.bind({});
SelectTermSuggestionFiresTrackingAndFillInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);
  const searchSuggestionItem = canvas.getAllByTestId('cio-item-SearchSuggestions')[0];
  await userEvent.click(searchSuggestionItem);
  const isSearchTrackingRequestSent = isTrackingRequestSent('/search?original_query=');
  const isSelectTrackingRequestSent = isTrackingRequestSent('/select?original_query=');
  expect(isSearchTrackingRequestSent).toBeTruthy();
  expect(isSelectTrackingRequestSent).toBeTruthy();
  await sleep(1000);
  expect(canvas.getByTestId('cio-input')).toHaveValue(searchSuggestionItem.textContent);
};

// - select product suggestion => network tracking event
// - select product suggestion => update input to match clicked product
export const SelectProductSuggestionFiresTrackingAndFillInput = Hook.bind({});
SelectProductSuggestionFiresTrackingAndFillInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productSuggestionItem = canvas.getAllByTestId('cio-item-Products')[0];
  await userEvent.click(productSuggestionItem);
  const isSelectTrackingRequestSent = isTrackingRequestSent('/select?original_query=');
  expect(isSelectTrackingRequestSent).toBeTruthy();
  await sleep(1000);
  expect(canvas.getByTestId('cio-input')).toHaveValue(productSuggestionItem.textContent);
};

// - click Enter in input => network search submit event
export const EnterKeySubmitSearch = Hook.bind({});
EnterKeySubmitSearch.args = defaultArgs;
EnterKeySubmitSearch.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  await userEvent.keyboard('{Enter}');
  expect(isTrackingRequestSent('/search?original_query=')).toBeTruthy();
};

// - focus => render zero state
// - type search term => render search suggestions / products
export const ZeroStateRenderProductsSection = HooksZeroState.bind({});
ZeroStateRenderProductsSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByTestId('cio-item-bestsellers').length).toBeGreaterThan(0);

  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productImageElement = canvas.getAllByTestId('cio-img')?.[0];
  expect(canvas.getAllByTestId('cio-item-Products')[0]).toContainElement(productImageElement);
};
