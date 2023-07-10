import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  advancedParametersDescription,
  termsWithGroupSuggestionsDescription,
  advancedParametersDefaultDescription,
  filteredSuggestionsDescription,
  apiKey,
  onSubmitDefault as onSubmit,
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
    autocompleteParameters: {
      filters: {
        group_id: '1130',
      },
    },
  },
};
addHookStoryCode(
  FilteredSuggestions,
  `const args = ${stringifyWithDefaults(FilteredSuggestions.args)}`,
  filteredSuggestionsDescription
);
