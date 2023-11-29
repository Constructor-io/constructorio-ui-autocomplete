import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { functionStrings, stringifyWithDefaults } from '../../../utils';
import { ComponentTemplate, FullExampleTemplate, addComponentStoryDescription } from '.';
import {
  fullFeaturedAndStyledExampleDescription,
  apiKeyDescription,
  cioJsClientDescription,
  componentDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  cioJsClientOptionsDescription,
} from '../../../constants';

export default {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: componentDescription,
      },
    },
  },
};

let autocompleteClassName = 'cio-autocomplete full-example-autocomplete-styles';

export const FullFeaturedAndStyledExample = FullExampleTemplate.bind({});
FullFeaturedAndStyledExample.args = {
  apiKey,
  onSubmit,
  autocompleteClassName,
  placeholder: 'What can we help you find?',
  advancedParameters: {
    displaySearchSuggestionImages: true,
    displaySearchSuggestionResultCounts: true,
    numTermsWithGroupSuggestions: 6,
  },
  sections: [
    {
      identifier: 'Search Suggestions',
      numResults: 8,
      displaySearchTermHighlights: true,
    },
    {
      identifier: 'Products',
      numResults: 6,
      displaySearchTermHighlights: true,
    },
  ],
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
      section: 'Products',
      numResults: 6,
    },
  ],
};
addComponentStoryDescription(
  FullFeaturedAndStyledExample,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(FullFeaturedAndStyledExample.args)}`,
  fullFeaturedAndStyledExampleDescription
);

export const ProvideAPIKey = ComponentTemplate.bind({});
ProvideAPIKey.args = { apiKey, onSubmit };
addComponentStoryDescription(
  ProvideAPIKey,
  `const args = ${stringifyWithDefaults(ProvideAPIKey.args)}`,
  apiKeyDescription
);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const ProvideCIOClientInstance = ComponentTemplate.bind({});
ProvideCIOClientInstance.args = { cioJsClient, onSubmit };
addComponentStoryDescription(
  ProvideCIOClientInstance,
  `
import ConstructorIOClient from "@constructor-io/constructorio-client-javascript";

const cioJsClient = new ConstructorIOClient({ "apiKey": "${apiKey}" });
const args = { cioJsClient, onSubmit: ${functionStrings.onSubmit} };`,
  cioJsClientDescription
);

const cioJsClientOptions = { serviceUrl: 'https://ac.cnstrc.com' };

export const ProvideCIOClientOptions = ComponentTemplate.bind({});
ProvideCIOClientOptions.args = { apiKey, cioJsClientOptions, onSubmit };
addComponentStoryDescription(
  ProvideCIOClientOptions,
  `const args = ${stringifyWithDefaults(ProvideCIOClientOptions.args)}`,
  cioJsClientOptionsDescription
);

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder = ComponentTemplate.bind({});
ProvideCustomPlaceHolder.args = { apiKey, onSubmit, placeholder };
addComponentStoryDescription(
  ProvideCustomPlaceHolder,
  `const args = ${stringifyWithDefaults(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles = ComponentTemplate.bind({});
ProvideCustomStyles.args = { apiKey, onSubmit, autocompleteClassName };
addComponentStoryDescription(
  ProvideCustomStyles,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(ProvideCustomStyles.args)}`,
  customStylesDescription
);
