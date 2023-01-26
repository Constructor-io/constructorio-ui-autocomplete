import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { argTypes } from '../argTypes';
import { stringify, disableStoryActions } from '../../../utils';
import {
  onChangeDescription,
  onFocusDescription,
  onSubmitDescription,
  userEventsDescription,
  apiKey
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/User Events',
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

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

const onFocus = () => {
  console.log('Focus!');
};
export const OnFocus = ComponentTemplate.bind({});
OnFocus.args = { apiKey, onFocus };
addComponentStoryDescription(
  OnFocus,
  `const args = {
    apiKey: '${apiKey}',
    onFocus: () => { console.log('Focus!') }
  }`,
  onFocusDescription
);
disableStoryActions(OnFocus);

const onChange = (inputFieldValue) => {
  console.log('New Query: ' + inputFieldValue);
};
export const OnChange = ComponentTemplate.bind({});
OnChange.args = { apiKey, onChange };
addComponentStoryDescription(
  OnChange,
  `const args = {
    apiKey: '${apiKey}',
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
export const OnSubmit = ComponentTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
addComponentStoryDescription(
  OnSubmit,
  `const args = {
    apiKey: '${apiKey}',
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
