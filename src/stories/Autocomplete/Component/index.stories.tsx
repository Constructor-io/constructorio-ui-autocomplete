import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { ComponentTemplate, addComponentStoryDescription, apiKey } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  componentDescription,
  placeholderDescription
} from '../../../constants';

export default {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: componentDescription
      }
    }
  }
};

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
addComponentStoryDescription(Default, `const args = ${stringify(Default.args)}`);

export const ApiKey = ComponentTemplate.bind({});
ApiKey.args = { apiKey };
addComponentStoryDescription(ApiKey, `const args = ${stringify(ApiKey.args)}`, apiKeyDescription);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = ComponentTemplate.bind({});
CioJsClient.args = { cioJsClient };
addComponentStoryDescription(
  CioJsClient,
  `
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: 'key_jaqzPcUDnK66puIO' });
const args = { cioJsClient };`,
  cioJsClientDescription
);

const placeholder = 'Custom placeholder';

export const Placeholder = ComponentTemplate.bind({});
Placeholder.args = { apiKey, placeholder };
addComponentStoryDescription(
  Placeholder,
  `const args = ${stringify(Placeholder.args)}`,
  placeholderDescription
);
