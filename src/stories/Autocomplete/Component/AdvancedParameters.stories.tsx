import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils';
import { ComponentTemplate, addComponentStoryDescription } from '.';
import {
  advancedParametersDescription,
  termsWithGroupSuggestionsDescription,
  advancedParametersDefaultDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  termsWithFiltersDescription,
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

export const TermsWithFilters = ComponentTemplate.bind({});
TermsWithFilters.args = {
  apiKey,
  onSubmit,
  advancedParameters: {
    autocompleteParameters: {
      filters: {
        'Products][color': 'Black',
      },
    },
  },
};
addComponentStoryDescription(
  TermsWithFilters,
  `const args = ${stringifyWithDefaults(TermsWithFilters.args)}`,
  termsWithFiltersDescription
);
