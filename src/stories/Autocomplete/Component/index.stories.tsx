import { ComponentMeta } from '@storybook/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryCode, apiKey } from '.';
import { componentDescription } from '../../../constants';

export default {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    docs: {
      description: {
        component: componentDescription
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

export const ApiKey = ComponentTemplate.bind({});
ApiKey.args = { apiKey };
addComponentStoryCode(ApiKey, `const args = ${stringify(ApiKey.args)}`);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = ComponentTemplate.bind({});
CioJsClient.args = { cioJsClient };
addComponentStoryCode(
  CioJsClient,
  `
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: 'key_jaqzPcUDnK66puIO' });
const args = { cioJsClient };`
);

const placeholder = 'Custom placeholder';

export const Placeholder = ComponentTemplate.bind({});
Placeholder.args = { apiKey, placeholder };
addComponentStoryCode(Placeholder, `const args = ${stringify(Placeholder.args)}`);
