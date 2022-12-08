import { ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { HooksTemplate, getHookStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/User Events',
  component: CioAutocomplete,
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

const onFocus = () => {
  console.log('Focus!');
};

export const OnFocus = HooksTemplate.bind({});
OnFocus.args = { apiKey, onFocus };
OnFocus.parameters = getHookStoryParams(
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onFocus: () => { console.log('Focus!') }
  }`
);

const onChange = (inputFieldValue) => {
  console.log('New Query: ' + inputFieldValue);
};

export const OnChange = HooksTemplate.bind({});
OnChange.args = { apiKey, onChange };
OnChange.parameters = getHookStoryParams(
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onChange: (inputFieldValue) => {
      console.log('New Query: ' + inputFieldValue);
    }
  }`
);

const onSubmit = (submitEvent) => {
  const { query, item, originalQuery } = submitEvent;
  if (query) {
    console.log('Submitted query: ' + query);
  } else {
    console.log('Selected a search suggestion for: ' + originalQuery);
    console.dir(item);
  }
};

export const OnSubmit = HooksTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
OnSubmit.parameters = getHookStoryParams(
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onChange: (submitEvent) => {
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
