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
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
SearchSuggestions.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
}`);

export const Products = HooksTemplate.bind({});
Products.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products'
    }
  ]
};
Products.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sections: [
    {
      identifier: 'Products',
    }
  ]
}`);

export const NumResults = HooksTemplate.bind({});
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
NumResults.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  sections: [
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
  sections: [
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
  sections: [
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
Recommendations.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
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
}`);

export const CustomSection = HooksTemplate.bind({});
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
CustomSection.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
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
}`);
