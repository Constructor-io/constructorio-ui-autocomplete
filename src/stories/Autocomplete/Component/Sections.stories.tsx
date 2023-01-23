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
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/Sections',
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

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

export const RenderSearchSuggestions = ComponentTemplate.bind({});
RenderSearchSuggestions.args = {
  apiKey,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
addComponentStoryDescription(
  RenderSearchSuggestions,
  `const args = ${stringify(RenderSearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const RenderSuggestedProducts = ComponentTemplate.bind({});
RenderSuggestedProducts.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products'
    }
  ]
};
addComponentStoryDescription(
  RenderSuggestedProducts,
  `const args = ${stringify(RenderSuggestedProducts.args)}`,
  productsDescription
);

export const RenderSuggestedContent = ComponentTemplate.bind({});
RenderSuggestedContent.args = {
  apiKey,
  sections: [
    {
      identifier: 'Content'
    }
  ]
};
addComponentStoryDescription(
  RenderSuggestedContent,
  `const args = ${stringify(RenderSuggestedContent.args)}`,
  contentDescription
);

export const ConfigureNumberOfResultsPerSection = ComponentTemplate.bind({});
ConfigureNumberOfResultsPerSection.args = {
  apiKey,
  sections: [
    {
      identifier: 'Products',
      numResults: 2
    }
  ]
};
addComponentStoryDescription(
  ConfigureNumberOfResultsPerSection,
  `const args = ${stringify(ConfigureNumberOfResultsPerSection.args)}`,
  numResultsDescription
);

export const ConfigureOrderOfRenderedSections = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  ConfigureOrderOfRenderedSections,
  `const args = ${stringify(ConfigureOrderOfRenderedSections.args)}`,
  sectionOrderDescription
);

export const RenderRecommendations = ComponentTemplate.bind({});
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
      type: 'recommendations',
      numResults: 4
    }
  ]
};
addComponentStoryDescription(
  RenderRecommendations,
  `const args = ${stringify(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  RenderCustomSection,
  `const args = ${stringify(RenderCustomSection.args)}`,
  customSectionDescription
);
