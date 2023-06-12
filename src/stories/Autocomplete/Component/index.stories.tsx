import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { functionStrings, stringifyWithDefaults } from '../../../utils';
import { ComponentTemplate, addComponentStoryDescription } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  componentDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
  onSubmitDefault as onSubmit,
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

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder = ComponentTemplate.bind({});
ProvideCustomPlaceHolder.args = { apiKey, onSubmit, placeholder };
addComponentStoryDescription(
  ProvideCustomPlaceHolder,
  `const args = ${stringifyWithDefaults(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

const autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles = ComponentTemplate.bind({});
ProvideCustomStyles.args = { apiKey, onSubmit, autocompleteClassName };
addComponentStoryDescription(
  ProvideCustomStyles,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(ProvideCustomStyles.args)}`,
  customStylesDescription
);
