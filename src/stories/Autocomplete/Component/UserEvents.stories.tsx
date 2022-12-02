import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { ComponentTemplate, getComponentStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Component/User Events',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

const onFocus = () => {
  console.log('Focus!');
};

export const OnFocus = ComponentTemplate.bind({});
OnFocus.args = { apiKey, onFocus };
OnFocus.parameters = getComponentStoryParams(
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onFocus: () => { console.log('Focus!') }
  }`
);

const onChange = (inputFieldValue) => {
  console.log('New Query: ' + inputFieldValue);
};

export const OnChange = ComponentTemplate.bind({});
OnChange.args = { apiKey, onChange };
OnChange.parameters = getComponentStoryParams(
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

export const OnSubmit = ComponentTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
OnSubmit.parameters = getComponentStoryParams(
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
