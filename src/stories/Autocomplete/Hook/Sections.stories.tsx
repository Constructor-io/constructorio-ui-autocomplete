import { ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { HooksTemplate, getHookStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/Sections',
  component: CioAutocomplete,
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const SearchSuggestions = HooksTemplate.bind({});
SearchSuggestions.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SearchSuggestions.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions'
    }
  ]
}`);

export const Products = HooksTemplate.bind({});
Products.args = {
  apiKey,
  sectionConfigurations: [
    {
      identifier: 'Products'
    }
  ]
};
Products.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sectionConfigurations: [
    {
      identifier: 'Products',
    }
  ]
}`);

export const NumResults = HooksTemplate.bind({});
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
NumResults.parameters = getHookStoryParams(`
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

export const SectionOrder = HooksTemplate.bind({});
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
SectionOrder.parameters = getHookStoryParams(`
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

export const Recommendations = HooksTemplate.bind({});
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
Recommendations.parameters = getHookStoryParams(`
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

export const CustomSection = HooksTemplate.bind({});
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
CustomSection.parameters = getHookStoryParams(`
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
