import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { HooksTemplate, getHookStoryParams, addHookStoryCode, apiKey } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  hookDescription,
  placeholderDescription
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

export const ApiKey = HooksTemplate.bind({});
ApiKey.args = { apiKey };
addHookStoryCode(ApiKey, `const args = ${stringify(ApiKey.args)}`, apiKeyDescription);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = HooksTemplate.bind({});
CioJsClient.args = { cioJsClient };
addHookStoryCode(
  CioJsClient,
  `import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: 'key_jaqzPcUDnK66puIO' });
const args = { cioJsClient };`,
  cioJsClientDescription
);

const placeholder = 'Custom placeholder';

export const Placeholder = HooksTemplate.bind({});
Placeholder.args = { apiKey, placeholder };
addHookStoryCode(
  Placeholder,
  `const args = ${stringify(Placeholder.args)}`,
  placeholderDescription
);
