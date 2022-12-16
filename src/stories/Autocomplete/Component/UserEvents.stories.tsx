import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify, disableStoryActions } from '../../../utils';
import { userEventsDescription } from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryCode, apiKey } from '.';

export default {
  title: 'Autocomplete/Component/User Events',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    docs: {
      description: {
        component: userEventsDescription
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

const onFocus = () => {
  console.log('Focus!');
};
export const OnFocus = ComponentTemplate.bind({});
OnFocus.args = { apiKey, onFocus };
addComponentStoryCode(
  OnFocus,
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onFocus: () => { console.log('Focus!') }
  }`
);
disableStoryActions(OnFocus);

const onChange = (inputFieldValue) => {
  console.log('New Query: ' + inputFieldValue);
};
export const OnChange = ComponentTemplate.bind({});
OnChange.args = { apiKey, onChange };
addComponentStoryCode(
  OnChange,
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onChange: (inputFieldValue) => {
      console.log('New Query: ' + inputFieldValue);
    }
  }`
);
disableStoryActions(OnChange);

const onSubmit = (submitEvent) => {
  const { query, item, originalQuery } = submitEvent;
  if (query) {
    console.log('Submitted query: ' + query);
  } else {
    console.log('Selected a search suggestion for: ' + originalQuery);
    console.dir(item);
  }
};
export const OnSubmit = ComponentTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
addComponentStoryCode(
  OnSubmit,
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onSubmit: (submitEvent) => {
      const { query, item, originalQuery } = submitEvent;
      if (query) {
        console.log('Submitted query: ' + query);
      } else {
        console.log('Selected a search suggestion for: ' + originalQuery);
        console.dir(item);
      }
    }
  }`
);
disableStoryActions(OnSubmit);
