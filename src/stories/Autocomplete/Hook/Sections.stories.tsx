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
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode } from '.';

export default {
  title: 'Autocomplete/Hook/Sections',
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

export const Default = HooksTemplate.bind({});
Default.args = { apiKey, onSubmit };
Default.parameters = getHookStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

export const RenderSearchSuggestions = HooksTemplate.bind({});
RenderSearchSuggestions.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Search Suggestions',
    },
  ],
};
addHookStoryCode(
  RenderSearchSuggestions,
  `const args = ${stringifyWithDefaults(RenderSearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const RenderSuggestedProducts = HooksTemplate.bind({});
RenderSuggestedProducts.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Products',
      numResults: 4,
    },
  ],
};
addHookStoryCode(
  RenderSuggestedProducts,
  `const args = ${stringifyWithDefaults(RenderSuggestedProducts.args)}`,
  productsDescription
);

export const RenderSuggestedContent = HooksTemplate.bind({});
RenderSuggestedContent.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Content',
    },
  ],
};
addHookStoryCode(
  RenderSuggestedContent,
  `const args = ${stringifyWithDefaults(RenderSuggestedContent.args)}`,
  contentDescription
);

export const ConfigureNumberOfResultsPerSection = HooksTemplate.bind({});
ConfigureNumberOfResultsPerSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Products',
      numResults: 2,
    },
  ],
};
addHookStoryCode(
  ConfigureNumberOfResultsPerSection,
  `const args = ${stringifyWithDefaults(ConfigureNumberOfResultsPerSection.args)}`,
  numResultsDescription
);

export const ConfigureOrderOfRenderedSections = HooksTemplate.bind({});
ConfigureOrderOfRenderedSections.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Products',
    },
    {
      identifier: 'Search Suggestions',
    },
  ],
};
addHookStoryCode(
  ConfigureOrderOfRenderedSections,
  `const args = ${stringifyWithDefaults(ConfigureOrderOfRenderedSections.args)}`,
  sectionOrderDescription
);

export const RenderRecommendations = HooksTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Search Suggestions',
    },
    {
      identifier: 'Products',
    },
    {
      identifier: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
addHookStoryCode(
  RenderRecommendations,
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = HooksTemplate.bind({});
RenderCustomSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      identifier: 'Search Suggestions',
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
            id: '1',
          },
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
addHookStoryCode(
  RenderCustomSection,
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription
);
