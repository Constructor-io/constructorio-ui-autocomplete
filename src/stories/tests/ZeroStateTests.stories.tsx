import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CioAutocomplete from '../../components/Autocomplete/CioAutocomplete';
import { codeSnippet } from '../../snippets';
import { SectionItemsList } from '../../components';
import { SectionItem } from '../../components';
import { argTypes } from '../Autocomplete/argTypes';
import { CioAutocompleteProps } from '../../components/Autocomplete/CioAutocompleteProvider';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { clearConstructorRequests, isTrackingRequestSent, sleep } from '../../utils';

const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Autocomplete/Zero State/Interaction Tests',
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

const Template: ComponentStory<typeof CioAutocomplete> = (args: CioAutocompleteProps) => (
  <CioAutocomplete {...args} />
);

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

// - focus in input field with zero state => render zero state section
export const FocusRenderZeroStateSection = Template.bind({});
FocusRenderZeroStateSection.args = defaultArgs;
FocusRenderZeroStateSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByTestId('cio-item-bestsellers').length).toBeGreaterThan(0);
};

// - focus in input field with zero state and no open on focus => render no zero state section
export const NoOpenOnFocusDontRenderZeroStateSection = Template.bind({});
NoOpenOnFocusDontRenderZeroStateSection.args = { ...defaultArgs, openOnFocus: false };
NoOpenOnFocusDontRenderZeroStateSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getByTestId('cio-results')).toBeEmptyDOMElement();
};

export const ZeroStateRenderCustomSection = Template.bind({});
ZeroStateRenderCustomSection.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'recent_searches',
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1'
          }
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2'
          }
        }
      ]
    }
  ]
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

export const ZeroStateRenderProductsSection = Template.bind({});
ZeroStateRenderProductsSection.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products',
      parameters: {
        numResults: 4
      }
    }
  ],
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};

// - focus => render zero state
// - type search term => render products
ZeroStateRenderProductsSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('cio-input'));
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('');
  expect(canvas.getAllByTestId('cio-item-bestsellers').length).toBeGreaterThan(0);

  await userEvent.type(canvas.getByTestId('cio-input'), 'red', { delay: 100 });
  await sleep(1000);
  expect(canvas.getByTestId('cio-input').getAttribute('value')).toBe('red');
  expect(canvas.getAllByTestId('cio-item-Products').length).toBeGreaterThan(0);
  const productImageElement = canvas.getAllByTestId('cio-img')?.[0];
  expect(canvas.getAllByTestId('cio-item-Products')[0]).toContainElement(productImageElement);
};
