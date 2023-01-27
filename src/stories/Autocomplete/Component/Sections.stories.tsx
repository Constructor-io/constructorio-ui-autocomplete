import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils';
import {
  contentDescription,
  customSectionDescription,
  numResultsDescription,
  productsDescription,
  recommendationsDescription,
  searchSuggestionsDescription,
  sectionOrderDescription,
  sectionsDescription,
  apiKey,
  onSubmitDefault as onSubmit
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
Default.args = { apiKey, onSubmit };
Default.parameters = getComponentStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

export const RenderSearchSuggestions = ComponentTemplate.bind({});
RenderSearchSuggestions.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Search Suggestions'
    }
  ]
};
addComponentStoryDescription(
  RenderSearchSuggestions,
  `const args = ${stringifyWithDefaults(RenderSearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const RenderSuggestedProducts = ComponentTemplate.bind({});
RenderSuggestedProducts.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Products'
    }
  ]
};
addComponentStoryDescription(
  RenderSuggestedProducts,
  `const args = ${stringifyWithDefaults(RenderSuggestedProducts.args)}`,
  productsDescription
);

export const RenderSuggestedContent = ComponentTemplate.bind({});
RenderSuggestedContent.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Content'
    }
  ]
};
addComponentStoryDescription(
  RenderSuggestedContent,
  `const args = ${stringifyWithDefaults(RenderSuggestedContent.args)}`,
  contentDescription
);

export const ConfigureNumberOfResultsPerSection = ComponentTemplate.bind({});
ConfigureNumberOfResultsPerSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Products',
      numResults: 2
    }
  ]
};
addComponentStoryDescription(
  ConfigureNumberOfResultsPerSection,
  `const args = ${stringifyWithDefaults(ConfigureNumberOfResultsPerSection.args)}`,
  numResultsDescription
);

export const ConfigureOrderOfRenderedSections = ComponentTemplate.bind({});
ConfigureOrderOfRenderedSections.args = {
  apiKey,
  onSubmit,
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
  `const args = ${stringifyWithDefaults(ConfigureOrderOfRenderedSections.args)}`,
  sectionOrderDescription
);

export const RenderRecommendations = ComponentTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  onSubmit,
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
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
RenderCustomSection.args = {
  apiKey,
  onSubmit,
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
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription
);
