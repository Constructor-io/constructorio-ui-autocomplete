import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { defaultOnSubmitCode, stringifyWithDefaults } from '../../../utils';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  hookDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
  onSubmitDefault as onSubmit
} from '../../../constants';

export default {
  title: 'Autocomplete/Hook',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: hookDescription
      }
    }
  }
};

export const Default = HooksTemplate.bind({});
Default.args = { apiKey, onSubmit };
addHookStoryCode(Default, `const args = ${stringifyWithDefaults(Default.args)}`);

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
  `import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: '${apiKey}' });
const args = { cioJsClient, ${defaultOnSubmitCode} };`,
  cioJsClientDescription
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
  `const args = ${stringifyWithDefaults(ProvideCustomStyles.args)}`,
  customStylesDescription
);
