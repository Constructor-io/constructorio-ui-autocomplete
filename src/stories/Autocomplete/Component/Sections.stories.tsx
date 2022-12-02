import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
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
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SearchSuggestions.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions'
    }
  ]
}`);

export const Products = ComponentTemplate.bind({});
Products.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products'
    }
  ]
};
Products.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Products',
    }
  ]
}`);

export const NumResults = ComponentTemplate.bind({});
NumResults.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products',
      parameters: {
        numResults: 2
      }
    }
  ]
};
NumResults.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Products',
      parameters: {
        numResults: 2
      }
    }
  ]
}`);

export const SectionOrder = ComponentTemplate.bind({});
SectionOrder.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products'
    },
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SectionOrder.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Products'
    },
    {
      identifier: 'Search Suggestions'
    }
  ]
}`);

export const Recommendations = ComponentTemplate.bind({});
Recommendations.args = {
  apiKey,
  sectionConfigurations: [
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
Recommendations.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
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
}`);

export const CustomSection = ComponentTemplate.bind({});
CustomSection.args = {
  apiKey,
  sectionConfigurations: [
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
CustomSection.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
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
}`);
