import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { HooksTemplate, addHookStoryCode } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  hookDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey
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
Default.args = { apiKey };
addHookStoryCode(Default, `const args = ${stringify(Default.args)}`);

export const ApiKey = HooksTemplate.bind({});
ApiKey.args = { apiKey };
addHookStoryCode(ApiKey, `const args = ${stringify(ApiKey.args)}`, apiKeyDescription);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = HooksTemplate.bind({});
CioJsClient.args = { cioJsClient };
addHookStoryCode(
  CioJsClient,
  `import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: '${apiKey}' });
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

const autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const CustomStyles = HooksTemplate.bind({});
CustomStyles.args = { apiKey, autocompleteClassName };
addHookStoryCode(
  CustomStyles,
  `const args = ${stringify(CustomStyles.args)}`,
  customStylesDescription
);
