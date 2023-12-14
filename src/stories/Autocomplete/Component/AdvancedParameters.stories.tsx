import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils';
import { ComponentTemplate, addComponentStoryDescription } from '.';
import {
  advancedParametersDescription,
  termsWithGroupSuggestionsDescription,
  advancedParametersDefaultDescription,
  filteredSuggestionsDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  termsWithImagesAndCountsDescription,
  debounceDescription,
  translationsDescription,
} from '../../../constants';

export default {
  title: 'Autocomplete/Component/Advanced Parameters',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: advancedParametersDescription,
      },
    },
  },
};

export const Default = ComponentTemplate.bind({});
Default.args = {
  apiKey,
  onSubmit,
  advancedParameters: {},
};
addComponentStoryDescription(
  Default,
  `const args = ${stringifyWithDefaults(Default.args)}`,
  advancedParametersDefaultDescription
);

export const TermsWithGroupSuggestions = ComponentTemplate.bind({});
TermsWithGroupSuggestions.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    numTermsWithGroupSuggestions: 1,
    numGroupsSuggestedPerTerm: 2,
  },
};
addComponentStoryDescription(
  TermsWithGroupSuggestions,
  `const args = ${stringifyWithDefaults(TermsWithGroupSuggestions.args)}`,
  termsWithGroupSuggestionsDescription
);

export const FilteredSuggestions = ComponentTemplate.bind({});
FilteredSuggestions.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    filters: {
      group_id: '1130',
    },
  },
};
addComponentStoryDescription(
  FilteredSuggestions,
  `const args = ${stringifyWithDefaults(FilteredSuggestions.args)}`,
  filteredSuggestionsDescription
);

export const TermsWithImagesAndCounts = ComponentTemplate.bind({});
TermsWithImagesAndCounts.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    displaySearchSuggestionImages: true,
    displaySearchSuggestionResultCounts: true,
  },
};
addComponentStoryDescription(
  TermsWithImagesAndCounts,
  `const args = ${stringifyWithDefaults(TermsWithImagesAndCounts.args)}`,
  termsWithImagesAndCountsDescription
);

export const Debounce = ComponentTemplate.bind({});
Debounce.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    debounce: 100,
  },
};
addComponentStoryDescription(
  Debounce,
  `const args = ${stringifyWithDefaults(Debounce.args)}`,
  debounceDescription
);

export const Translations = ComponentTemplate.bind({});
Translations.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    numTermsWithGroupSuggestions: 1,
    numGroupsSuggestedPerTerm: 2,
    translations: {
      in: 'Inside',
    },
  },
};
addComponentStoryDescription(
  Translations,
  `const args = ${stringifyWithDefaults(Translations.args)}`,
  translationsDescription
);
