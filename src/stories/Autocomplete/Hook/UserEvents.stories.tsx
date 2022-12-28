import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify, disableStoryActions } from '../../../utils';
import {
  onChangeDescription,
  onFocusDescription,
  onSubmitDescription,
  userEventsDescription
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/User Events',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: userEventsDescription
      }
    }
  }
};

export const Default = HooksTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getHookStoryParams(`const args = ${stringify(Default.args)}`);

const onFocus = () => {
  console.log('Focus!');
};
export const OnFocus = HooksTemplate.bind({});
OnFocus.args = { apiKey, onFocus };
addHookStoryCode(
  OnFocus,
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onFocus: () => { console.log('Focus!') }
  }`,
  onFocusDescription
);
disableStoryActions(OnFocus);

const onChange = (inputFieldValue) => {
  console.log('New Query: ' + inputFieldValue);
};
export const OnChange = HooksTemplate.bind({});
OnChange.args = { apiKey, onChange };
addHookStoryCode(
  OnChange,
  `const args = {
    apiKey: 'key_jaqzPcUDnK66puIO',
    onChange: (inputFieldValue) => {
      console.log('New Query: ' + inputFieldValue);
    }
  }`,
  onChangeDescription
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
export const OnSubmit = HooksTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
addHookStoryCode(
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
  }`,
  onSubmitDescription
);
disableStoryActions(OnSubmit);
