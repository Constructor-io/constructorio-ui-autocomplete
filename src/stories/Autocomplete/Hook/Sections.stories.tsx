import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import {
  contentDescription,
  customSectionDescription,
  numResultsDescription,
  productsDescription,
  recommendationsDescription,
  searchSuggestionsDescription,
  sectionOrderDescription,
  sectionsDescription
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/Sections',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: sectionsDescription
      }
    }
  }
};

export const Default = HooksTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getHookStoryParams(`const args = ${stringify(Default.args)}`);

export const SearchSuggestions = HooksTemplate.bind({});
SearchSuggestions.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
addHookStoryCode(
  SearchSuggestions,
  `const args = ${stringify(SearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const Products = HooksTemplate.bind({});
Products.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      numResults: 4
    }
  ]
};
addHookStoryCode(Products, `const args = ${stringify(Products.args)}`, productsDescription);

export const Content = HooksTemplate.bind({});
Content.args = {
  apiKey,
  sections: [
    {
      identifier: 'Content'
    }
  ]
};
addHookStoryCode(Content, `const args = ${stringify(Content.args)}`, contentDescription);

export const NumResults = HooksTemplate.bind({});
NumResults.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      numResults: 2
    }
  ]
};
addHookStoryCode(NumResults, `const args = ${stringify(NumResults.args)}`, numResultsDescription);

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
addHookStoryCode(
  SectionOrder,
  `const args = ${stringify(SectionOrder.args)}`,
  sectionOrderDescription
);

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
addHookStoryCode(
  Recommendations,
  `const args = ${stringify(Recommendations.args)}`,
  recommendationsDescription
);

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
addHookStoryCode(
  CustomSection,
  `const args = ${stringify(CustomSection.args)}`,
  customSectionDescription
);
