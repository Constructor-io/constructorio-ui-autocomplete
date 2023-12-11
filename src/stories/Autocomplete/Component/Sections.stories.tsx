import { CioAutocomplete } from '../../../index';
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
  onSubmitDefault as onSubmit,
  displaySearchTermHighlightsDescription,
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/Sections',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: sectionsDescription,
      },
    },
  },
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
      indexSection: 'Search Suggestions',
    },
  ],
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
      indexSection: 'Products',
    },
  ],
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
      indexSection: 'Content',
    },
  ],
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
      indexSection: 'Products',
      numResults: 2,
    },
  ],
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
      indexSection: 'Products',
    },
    {
      indexSection: 'Search Suggestions',
    },
  ],
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
      indexSection: 'Search Suggestions',
    },
    {
      indexSection: 'Products',
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
      numResults: 4,
    },
  ],
};
addComponentStoryDescription(
  RenderRecommendations,
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const DisplaySearchTermHighlights = ComponentTemplate.bind({});
DisplaySearchTermHighlights.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSection: 'Search Suggestions',
      displaySearchTermHighlights: true,
    },
    {
      indexSection: 'Products',
      displaySearchTermHighlights: true,
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
      displaySearchTermHighlights: true,
    },
  ],
};
addComponentStoryDescription(
  DisplaySearchTermHighlights,
  `const args = ${stringifyWithDefaults(DisplaySearchTermHighlights.args)}`,
  displaySearchTermHighlightsDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
RenderCustomSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSection: 'Search Suggestions',
    },
    {
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          value: 'Red T-shirt',
          data: {
            id: '1',
          },
        },
        {
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
addComponentStoryDescription(
  RenderCustomSection,
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription
);
