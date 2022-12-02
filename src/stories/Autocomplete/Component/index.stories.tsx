import { ComponentMeta } from '@storybook/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { ComponentTemplate, getComponentStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = ComponentTemplate.bind({});
Default.args = {
  apiKey
};
Default.parameters = getComponentStoryParams(`const args = { apiKey: 'key_jaqzPcUDnK66puIO' }`);

export const ApiKey = ComponentTemplate.bind({});
ApiKey.args = {
  apiKey
};
ApiKey.parameters = getComponentStoryParams(`const args = { apiKey: 'key_jaqzPcUDnK66puIO' }`);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = ComponentTemplate.bind({});
CioJsClient.args = { cioJsClient };
CioJsClient.parameters = getComponentStoryParams(`
const cioJsClient = new ConstructorIOClient({ apiKey: 'key_jaqzPcUDnK66puIO' });
const args = { cioJsClient };`);

const placeholder = 'Custom placeholder';

export const Placeholder = ComponentTemplate.bind({});
Placeholder.args = { apiKey, placeholder };
Placeholder.parameters = getComponentStoryParams(
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    placeholder: 'Custom placeholder'
  }`
);
