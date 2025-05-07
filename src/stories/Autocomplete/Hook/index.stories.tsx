import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils/format';
import { functionStrings } from '../../../utils/helpers';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  hookDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  cioJsClientOptionsDescription,
} from '../../../constants';

export default {
  title: 'Autocomplete/Hook',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: hookDescription,
      },
    },
  },
};

export const ProvideAPIKey = HooksTemplate.bind({});
ProvideAPIKey.args = { apiKey, onSubmit };
addHookStoryCode(
  ProvideAPIKey,
  `const args = ${stringifyWithDefaults(ProvideAPIKey.args)}`,
  apiKeyDescription
);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const ProvideCIOClientInstance = HooksTemplate.bind({});
ProvideCIOClientInstance.args = { cioJsClient, onSubmit };
addHookStoryCode(
  ProvideCIOClientInstance,
  `import ConstructorIOClient from "@constructor-io/constructorio-client-javascript";

const cioJsClient = new ConstructorIOClient({ apiKey: "${apiKey}" });
const args = { cioJsClient, onSubmit: ${functionStrings.onSubmit} };`,
  cioJsClientDescription
);

const cioJsClientOptions = { serviceUrl: 'https://ac.cnstrc.com' };

export const ProvideCIOClientOptions = HooksTemplate.bind({});
ProvideCIOClientOptions.args = { apiKey, cioJsClientOptions, onSubmit };
addHookStoryCode(
  ProvideCIOClientOptions,
  `const args = ${stringifyWithDefaults(ProvideCIOClientOptions.args)}`,
  cioJsClientOptionsDescription
);

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder = HooksTemplate.bind({});
ProvideCustomPlaceHolder.args = { apiKey, onSubmit, placeholder };
addHookStoryCode(
  ProvideCustomPlaceHolder,
  `const args = ${stringifyWithDefaults(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

const autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles = HooksTemplate.bind({});
ProvideCustomStyles.args = { apiKey, onSubmit, autocompleteClassName };
addHookStoryCode(
  ProvideCustomStyles,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(ProvideCustomStyles.args)}`,
  customStylesDescription
);
