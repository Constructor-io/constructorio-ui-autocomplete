import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils/format';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  advancedParametersDescription,
  termsWithGroupSuggestionsDescription,
  advancedParametersDefaultDescription,
  filteredSuggestionsDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  termsWithImagesAndCountsDescription,
  debounceDescription,
  fetchZeroStateOnFocusDescription,
} from '../../../constants';

export default {
  title: 'Autocomplete/Hook/Advanced Parameters',
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

export const Default = HooksTemplate.bind({});
Default.args = {
  apiKey,
  onSubmit,
  advancedParameters: {},
};
addHookStoryCode(
  Default,
  `const args = ${stringifyWithDefaults(Default.args)}`,
  advancedParametersDefaultDescription
);

export const TermsWithGroupSuggestions = HooksTemplate.bind({});
TermsWithGroupSuggestions.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    numTermsWithGroupSuggestions: 1,
    numGroupsSuggestedPerTerm: 2,
  },
};
addHookStoryCode(
  TermsWithGroupSuggestions,
  `const args = ${stringifyWithDefaults(TermsWithGroupSuggestions.args)}`,
  termsWithGroupSuggestionsDescription
);

export const FilteredSuggestions = HooksTemplate.bind({});
FilteredSuggestions.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    filters: {
      group_id: '1130',
    },
  },
};
addHookStoryCode(
  FilteredSuggestions,
  `const args = ${stringifyWithDefaults(FilteredSuggestions.args)}`,
  filteredSuggestionsDescription
);

export const TermsWithImagesAndCounts = HooksTemplate.bind({});
TermsWithImagesAndCounts.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    displaySearchSuggestionImages: true,
    displaySearchSuggestionResultCounts: true,
  },
};
addHookStoryCode(
  TermsWithImagesAndCounts,
  `const args = ${stringifyWithDefaults(TermsWithImagesAndCounts.args)}`,
  termsWithImagesAndCountsDescription
);

export const Debounce = HooksTemplate.bind({});
Debounce.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    debounce: 100,
  },
};
addHookStoryCode(
  Debounce,
  `const args = ${stringifyWithDefaults(Debounce.args)}`,
  debounceDescription
);

export const FetchZeroStateOnFocus = HooksTemplate.bind({});
FetchZeroStateOnFocus.args = {
  apiKey,
  onSubmit,
  advancedParameters: { fetchZeroStateOnFocus: true },
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
      numResults: 3,
    },
  ],
};
addHookStoryCode(
  FetchZeroStateOnFocus,
  `const args = ${stringifyWithDefaults(FetchZeroStateOnFocus.args)}`,
  fetchZeroStateOnFocusDescription
);
