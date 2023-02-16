import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  hookDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
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
ProvideAPIKey.args = { apiKey };
addHookStoryCode(ProvideAPIKey, `const args = ${stringify(ProvideAPIKey.args)}`, apiKeyDescription);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const ProvideCIOClientInstance = HooksTemplate.bind({});
ProvideCIOClientInstance.args = { cioJsClient };
addHookStoryCode(
  ProvideCIOClientInstance,
  `import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: '${apiKey}' });
const args = { cioJsClient };`,
  cioJsClientDescription
);

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder = HooksTemplate.bind({});
ProvideCustomPlaceHolder.args = { apiKey, placeholder };
addHookStoryCode(
  ProvideCustomPlaceHolder,
  `const args = ${stringify(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

const autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles = HooksTemplate.bind({});
ProvideCustomStyles.args = { apiKey, autocompleteClassName };
addHookStoryCode(
  ProvideCustomStyles,
  `import '@constructor-io/constructorio-ui-autocomplete/starter-styles.css';

const args = ${stringify(ProvideCustomStyles.args)}`,
  customStylesDescription
);
