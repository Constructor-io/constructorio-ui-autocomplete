import { CioAutocomplete } from '../../../index';
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
  sectionsDescription,
  apiKey
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode } from '.';

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

export const RenderSearchSuggestions = HooksTemplate.bind({});
RenderSearchSuggestions.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
addHookStoryCode(
  RenderSearchSuggestions,
  `const args = ${stringify(RenderSearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const RenderSuggestedProducts = HooksTemplate.bind({});
RenderSuggestedProducts.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      numResults: 4
    }
  ]
};
addHookStoryCode(
  RenderSuggestedProducts,
  `const args = ${stringify(RenderSuggestedProducts.args)}`,
  productsDescription
);

export const RenderSuggestedContent = HooksTemplate.bind({});
RenderSuggestedContent.args = {
  apiKey,
  sections: [
    {
      identifier: 'Content'
    }
  ]
};
addHookStoryCode(
  RenderSuggestedContent,
  `const args = ${stringify(RenderSuggestedContent.args)}`,
  contentDescription
);

export const ConfigureNumberOfResultsPerSection = HooksTemplate.bind({});
ConfigureNumberOfResultsPerSection.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      numResults: 2
    }
  ]
};
addHookStoryCode(
  ConfigureNumberOfResultsPerSection,
  `const args = ${stringify(ConfigureNumberOfResultsPerSection.args)}`,
  numResultsDescription
);

export const ConfigureOrderOfRenderedSections = HooksTemplate.bind({});
ConfigureOrderOfRenderedSections.args = {
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
  ConfigureOrderOfRenderedSections,
  `const args = ${stringify(ConfigureOrderOfRenderedSections.args)}`,
  sectionOrderDescription
);

export const RenderRecommendations = HooksTemplate.bind({});
RenderRecommendations.args = {
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
  RenderRecommendations,
  `const args = ${stringify(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = HooksTemplate.bind({});
RenderCustomSection.args = {
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
  RenderCustomSection,
  `const args = ${stringify(RenderCustomSection.args)}`,
  customSectionDescription
);
