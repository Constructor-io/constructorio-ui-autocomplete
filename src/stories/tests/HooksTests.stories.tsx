import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CioAutocomplete } from '../../index';
import { argTypes } from '../Autocomplete/argTypes';
import { getCioClient, isTrackingRequestSent, sleep } from '../../utils';
import { HooksTemplate } from '../Autocomplete/Hook/index';
import { apiKey, onSubmitDefault as onSubmit } from '../../constants';
import { CioAutocompleteProps } from '../../types';

export default {
  title: 'Autocomplete/Interaction Tests/Hook',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        language: 'jsx',
        format: true,
        type: 'code',
      },
    },
  },
};

const defaultArgs: CioAutocompleteProps = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Products',
    },
    {
      indexSectionName: 'Search Suggestions',
    },
  ],
};

// - No Interaction => Correctly render default state
export const RenderAutocompleteDefaultState = HooksTemplate.bind({});
RenderAutocompleteDefaultState.args = defaultArgs;
RenderAutocompleteDefaultState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
  expect(canvas.getByTestId('cio-input')).toHaveAttribute('placeholder');
  expect(canvas.getByPlaceholderText('What can we help you find today?')).toBeInTheDocument();
};

// - No Interaction => Correctly render custom placeholder
export const RenderAutocompleteCustomPlaceholder = HooksTemplate.bind({});
RenderAutocompleteCustomPlaceholder.args = { ...defaultArgs, placeholder: 'custom placeholder' };
RenderAutocompleteCustomPlaceholder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
  expect(canvas.getByTestId('cio-input')).toHaveAttribute('placeholder');
  expect(canvas.getByPlaceholderText('custom placeholder')).toBeInTheDocument();
};

// - focus in input field => network tracking event
export const FocusFiresTrackingEvent = HooksTemplate.bind({});
FocusFiresTrackingEvent.args = defaultArgs;
FocusFiresTrackingEvent.play = async ({ canvasElement }) => {
  await sleep(100);
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  const isFocusTrackingRequestSent = isTrackingRequestSent('action=focus');
  expect(isFocusTrackingRequestSent).toBeTruthy();
};

// - focus in input field (with no zeroStateSections) => render no autocomplete sections
export const FocusNoZeroStateShowNoResults = HooksTemplate.bind({});
FocusNoZeroStateShowNoResults.args = defaultArgs;
FocusNoZeroStateShowNoResults.play = async ({ canvasElement }) => {
  await sleep(100);
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
};

// - type whitespace search term => doesn't run an autocomplete request
export const TypeWhitespaceSearchTermNoError = HooksTemplate.bind({});
TypeWhitespaceSearchTermNoError.args = {
  apiKey,
};
let isAutocompleteResultsError = false;
const cioJsClientStub = getCioClient(apiKey);

if (cioJsClientStub != null) {
  const getAutocompleteResultsDefault = cioJsClientStub.autocomplete.getAutocompleteResults.bind(
    cioJsClientStub.autocomplete
  );
  const getAutocompleteResultsStub = (...args) =>
    getAutocompleteResultsDefault(...args)
      .then((res) => {
        isAutocompleteResultsError = false;
        return res;
      })
      .catch(() => {
        isAutocompleteResultsError = true;
      });

  cioJsClientStub.autocomplete.getAutocompleteResults = getAutocompleteResultsStub;
  TypeWhitespaceSearchTermNoError.args.cioJsClient = cioJsClientStub;
}

TypeWhitespaceSearchTermNoError.play = async ({ canvasElement }) => {
  const whitespaceInput = '    ';
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByTestId('cio-input'), whitespaceInput, { delay: 100 });
  await sleep(1000);

  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe(whitespaceInput);
  expect(isAutocompleteResultsError).toBeFalsy();
};

// - type search term => render term suggestions
export const TypeSearchTermRenderSearchSuggestions = HooksTemplate.bind({});
TypeSearchTermRenderSearchSuggestions.args = {
  apiKey,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
    },
  ],
};
TypeSearchTermRenderSearchSuggestions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);
};

// - type search term => render products section
export const TypeSearchTermRenderProducts = HooksTemplate.bind({});
TypeSearchTermRenderProducts.args = {
  apiKey,
  sections: [
    {
      indexSectionName: 'Products',
    },
  ],
};
TypeSearchTermRenderProducts.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productImageElement = canvas.getAllByTestId('cio-img')?.[0];
  expect(canvas.getAllByTestId('cio-item-Products')[0]).toContainElement(productImageElement);
};

// - type search term => render Recommendations
export const TypeSearchTermRenderRecommendations = HooksTemplate.bind({});
TypeSearchTermRenderRecommendations.args = {
  apiKey,
  sections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
TypeSearchTermRenderRecommendations.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByText('bestsellers').length).toBeGreaterThan(0);
};

// - type search term => render all sections in default order
export const TypeSearchTermRenderSectionsDefaultOrder = HooksTemplate.bind({});
TypeSearchTermRenderSectionsDefaultOrder.args = {
  apiKey,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
    },
    {
      indexSectionName: 'Products',
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
TypeSearchTermRenderSectionsDefaultOrder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  expect(canvas.getAllByText('bestsellers').length).toBeGreaterThan(0);

  expect(canvas.getByTestId('cio-results').children[0].className).toContain('Search Suggestions');
  expect(canvas.getByTestId('cio-results').children[1].className).toContain('Products');
  expect(canvas.getByTestId('cio-results').children[2].className).toContain('bestsellers');
};

// - type search term => render all sections in custom order
export const TypeSearchTermRenderSectionsCustomOrder = HooksTemplate.bind({});
TypeSearchTermRenderSectionsCustomOrder.args = {
  apiKey,
  sections: [
    {
      indexSectionName: 'Products',
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
    {
      indexSectionName: 'Search Suggestions',
    },
  ],
};
// TODO: duplicate tests? these don't seem to run on npm run test-storybook
TypeSearchTermRenderSectionsCustomOrder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-SearchSuggestions').length).toBeGreaterThan(0);
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  expect(canvas.getAllByText('bestsellers').length).toBeGreaterThan(0);

  expect(canvas.getByTestId('cio-results').children[0].className).toContain('Products');
  expect(canvas.getByTestId('cio-results').children[1].className).toContain('bestsellers');
  expect(canvas.getByTestId('cio-results').children[2].className).toContain('Search Suggestions');
};

// - select term suggestion => network tracking event
// - select term suggestion => network search submit event
// - select term suggestion => update input to match clicked term
export const SelectTermSuggestionFiresTrackingAndFillInput = HooksTemplate.bind({});
SelectTermSuggestionFiresTrackingAndFillInput.args = defaultArgs;
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
export const SelectProductSuggestionFiresTrackingAndFillInput = HooksTemplate.bind({});
SelectProductSuggestionFiresTrackingAndFillInput.args = defaultArgs;
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
};

// - focus in input field with zero state => render zero state section
export const FocusRenderZeroStateSection = HooksTemplate.bind({});
FocusRenderZeroStateSection.args = {
  apiKey,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
FocusRenderZeroStateSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByText('bestsellers').length).toBeGreaterThan(0);
};

// - focus in input field with zero state and no open on focus => render no zero state section
export const NoOpenOnFocusDontRenderZeroStateSection = HooksTemplate.bind({});
NoOpenOnFocusDontRenderZeroStateSection.args = {
  ...defaultArgs,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
  openOnFocus: false,
};
NoOpenOnFocusDontRenderZeroStateSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
};

export const ZeroStateRenderCustomSection = HooksTemplate.bind({});
ZeroStateRenderCustomSection.args = {
  apiKey,
  zeroStateSections: [
    {
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1',
          },
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
ZeroStateRenderCustomSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByTestId('cio-item-recent_searches').length).toBeGreaterThan(0);
  const firstItem = canvas.getAllByTestId('cio-item-recent_searches')[0];
  expect(firstItem.innerText).toEqual('Red T-shirt');
};

export const ZeroStateRenderProductsSection = HooksTemplate.bind({});
ZeroStateRenderProductsSection.args = {
  apiKey,
  sections: [
    {
      indexSectionName: 'Products',
      numResults: 4,
    },
  ],
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};

// - focus => render zero state
// - type search term => render products
ZeroStateRenderProductsSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByText('bestsellers').length).toBeGreaterThan(0);

  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productImageElement = canvas.getAllByTestId('cio-img')?.[0];
  expect(canvas.getAllByTestId('cio-item-Products')[0]).toContainElement(productImageElement);
};

export const InGroupSuggestions = HooksTemplate.bind({});
InGroupSuggestions.args = {
  apiKey,
  advancedParameters: {
    numTermsWithGroupSuggestions: 1,
    numGroupsSuggestedPerTerm: 2,
  },
};

InGroupSuggestions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'socks', { delay: 100 });
  await sleep(1000);
  expect(canvas.getAllByText('in Socks & Underwear').length).toEqual(1);
};

export const InGroupSuggestionsTwo = HooksTemplate.bind({});
InGroupSuggestionsTwo.args = {
  apiKey,
  advancedParameters: {
    numTermsWithGroupSuggestions: 3,
    numGroupsSuggestedPerTerm: 1,
  },
};

InGroupSuggestionsTwo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId('cio-input'), 'suit', { delay: 100 });
  await sleep(1000);
  expect(canvas.getAllByText('in Blazers').length).toBeGreaterThan(1);
};
