import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { ComponentTemplate, addComponentStoryDescription } from '.';
import {
  apiKeyDescription,
  cioJsClientDescription,
  componentDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
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

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
addComponentStoryDescription(Default, `const args = ${stringify(Default.args)}`);

export const ProvideAPIKey = ComponentTemplate.bind({});
ProvideAPIKey.args = { apiKey };
addComponentStoryDescription(
  ProvideAPIKey,
  `const args = ${stringify(ProvideAPIKey.args)}`,
  apiKeyDescription
);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const ProvideCIOClientInstance = ComponentTemplate.bind({});
ProvideCIOClientInstance.args = { cioJsClient };
addComponentStoryDescription(
  ProvideCIOClientInstance,
  `
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const cioJsClient = new ConstructorIOClient({ apiKey: '${apiKey}' });
const args = { cioJsClient };`,
  cioJsClientDescription
);

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder = ComponentTemplate.bind({});
ProvideCustomPlaceHolder.args = { apiKey, placeholder };
addComponentStoryDescription(
  ProvideCustomPlaceHolder,
  `const args = ${stringify(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

const autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles = ComponentTemplate.bind({});
ProvideCustomStyles.args = { apiKey, autocompleteClassName };
addComponentStoryDescription(
  ProvideCustomStyles,
  `const args = ${stringify(ProvideCustomStyles.args)}`,
  customStylesDescription
);
