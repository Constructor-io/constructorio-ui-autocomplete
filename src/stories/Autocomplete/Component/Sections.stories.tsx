import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
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
import {
  ComponentTemplate,
  getComponentStoryParams,
  addComponentStoryDescription,
  apiKey
} from '.';

export default {
  title: 'Autocomplete/Component/Sections',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    docs: {
      description: {
        component: sectionsDescription
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

export const SearchSuggestions = ComponentTemplate.bind({});
SearchSuggestions.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
addComponentStoryDescription(
  SearchSuggestions,
  `const args = ${stringify(SearchSuggestions.args)}`,
  searchSuggestionsDescription
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
addComponentStoryDescription(
  Products,
  `const args = ${stringify(Products.args)}`,
  productsDescription
);

export const Content = ComponentTemplate.bind({});
Content.args = {
  apiKey,
  sections: [
    {
      identifier: 'Content'
    }
  ]
};
addComponentStoryDescription(
  Content,
  `const args = ${stringify(Content.args)}`,
  contentDescription
);

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
addComponentStoryDescription(
  NumResults,
  `const args = ${stringify(NumResults.args)}`,
  numResultsDescription
);

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
addComponentStoryDescription(
  SectionOrder,
  `const args = ${stringify(SectionOrder.args)}`,
  sectionOrderDescription
);

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
addComponentStoryDescription(
  Recommendations,
  `const args = ${stringify(Recommendations.args)}`,
  recommendationsDescription
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
addComponentStoryDescription(
  CustomSection,
  `const args = ${stringify(CustomSection.args)}`,
  customSectionDescription
);
