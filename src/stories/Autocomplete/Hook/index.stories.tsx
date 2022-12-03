import { ComponentMeta } from '@storybook/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { HooksTemplate, getHookStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook',
  component: CioAutocomplete,
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = HooksTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getHookStoryParams(`const args = ${stringify(Default.args)}`);

export const ApiKey = HooksTemplate.bind({});
ApiKey.args = { apiKey };
ApiKey.parameters = getHookStoryParams(`const args = ${stringify(ApiKey.args)}`);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const CioJsClient = HooksTemplate.bind({});
CioJsClient.args = { cioJsClient };
CioJsClient.parameters = getHookStoryParams(`
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: 'key_jaqzPcUDnK66puIO' });
const args = { cioJsClient };`);

const placeholder = 'Custom placeholder';

export const Placeholder = HooksTemplate.bind({});
Placeholder.args = { apiKey, placeholder };
Placeholder.parameters = getHookStoryParams(`const args = ${stringify(Placeholder.args)}`);
