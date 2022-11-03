import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CioAutocomplete from '../../components/Autocomplete/CioAutocomplete';
import { CioAutocompleteProps } from '../../types';
import { codeSnippet } from '../../snippets';
import { SectionItemsList } from '../../components';
import { SectionItem } from '../../components';
import { argTypes } from './argTypes';

const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  subcomponents: { SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        code: codeSnippet,
        language: "jsx",
        format: true,
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof CioAutocomplete>;

const Template: ComponentStory<typeof CioAutocomplete> = (args: CioAutocompleteProps) => <CioAutocomplete {...args} />;

export const SearchSuggestions = Template.bind({});
SearchSuggestions.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions',
    },
  ],
};

export const Products = Template.bind({});
Products.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products',
      parameters: {
        numResults: 4,
      },
    }
  ],
};

export const ProductsAndSearchSuggestions = Template.bind({});
ProductsAndSearchSuggestions.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products',
    },
    {
      identifier: 'Search Suggestions',
    }
  ],
};

export const SearchSuggestionsProductsBestsellers = Template.bind({});
SearchSuggestionsProductsBestsellers.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products',
    },
    {
      identifier: 'Search Suggestions',
    },
    {
      identifier: 'bestsellers',
      type: 'recommendations',
    }
  ],
};
