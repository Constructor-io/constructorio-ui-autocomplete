import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { ComponentTemplate, getComponentStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Component/Sections',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const SearchSuggestions = ComponentTemplate.bind({});
SearchSuggestions.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SearchSuggestions.parameters = getComponentStoryParams(
  `const args = ${stringify(SearchSuggestions.args)}`
);

export const Products = ComponentTemplate.bind({});
Products.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products'
    }
  ]
};
Products.parameters = getComponentStoryParams(`
const args = ${stringify(Products.args)}`);

export const NumResults = ComponentTemplate.bind({});
NumResults.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      parameters: {
        numResults: 2
      }
    }
  ]
};
NumResults.parameters = getComponentStoryParams(`const args = ${stringify(NumResults.args)}`);

export const SectionOrder = ComponentTemplate.bind({});
SectionOrder.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products'
    },
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SectionOrder.parameters = getComponentStoryParams(`
const args = ${stringify(SectionOrder.args)}`);

export const Recommendations = ComponentTemplate.bind({});
Recommendations.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    },
    {
      identifier: 'Products'
    },
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
Recommendations.parameters = getComponentStoryParams(
  `const args = ${stringify(Recommendations.args)}`
);

export const CustomSection = ComponentTemplate.bind({});
CustomSection.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    },
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
CustomSection.parameters = getComponentStoryParams(`const args = ${stringify(CustomSection.args)}`);
