/* eslint-disable no-console */
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils/format';
import { disableStoryActions, functionStrings } from '../../../utils/helpers';
import {
  onChangeDescription,
  onFocusDescription,
  onSubmitDescription,
  userEventsDescription,
  apiKey,
  onSubmitDefault,
  onIsOpenChangeDescription,
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/User Events',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: userEventsDescription,
      },
    },
  },
};

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey, onSubmit: onSubmitDefault };
Default.parameters = getComponentStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

const onFocus = () => {
  console.log('Focus!');
};
export const OnFocus = ComponentTemplate.bind({});
OnFocus.args = { apiKey, onSubmit: onSubmitDefault, onFocus };
addComponentStoryDescription(
  OnFocus,
  `const args = {
  "apiKey": ${apiKey},
  "onSubmit": ${functionStrings.onSubmit}
  "onFocus": () => { console.log("Focus!") }
}`,
  onFocusDescription
);
disableStoryActions(OnFocus);

const onChange = (inputFieldValue) => {
  console.log(`New Query: ${inputFieldValue}`);
};
export const OnChange = ComponentTemplate.bind({});
OnChange.args = { apiKey, onSubmit: onSubmitDefault, onChange };
addComponentStoryDescription(
  OnChange,
  `const args = {
  "apiKey": ${apiKey},
  "onSubmit": ${functionStrings.onSubmit}
  "onChange": (inputFieldValue) => {
    console.log("New Query: " + inputFieldValue);
  }
}`,
  onChangeDescription
);
disableStoryActions(OnChange);

const onSubmit = (submitEvent) => {
  const { query, item, originalQuery } = submitEvent;
  if (query) {
    console.log(`Submitted query: ${query}`);
  } else {
    console.log(`Selected a search suggestion for: ${originalQuery}`);
    console.dir(item);
  }
};

export const OnSubmit = ComponentTemplate.bind({});
OnSubmit.args = { apiKey, onSubmit };
addComponentStoryDescription(
  OnSubmit,
  `const args = {
  "apiKey": "${apiKey}",
  "onSubmit": (submitEvent) => {
    const { query, item, originalQuery } = submitEvent;
    if (query) {
      console.log("Submitted query: " + query);
    } else {
      console.log("Selected a search suggestion for: " + originalQuery);
      console.dir(item);
    }
  }
}`,
  onSubmitDescription
);
disableStoryActions(OnSubmit);

const onIsOpenChange = (changes) => {
  console.log(`Dropdown menu changes: ${JSON.stringify(changes)}`);
};
export const OnIsOpenChange = ComponentTemplate.bind({});
OnIsOpenChange.args = { apiKey, onSubmit: onSubmitDefault, onIsOpenChange };
addComponentStoryDescription(
  OnIsOpenChange,
  `const args = {
  "apiKey": ${apiKey},
  "onSubmit": ${functionStrings.onSubmit}
  "onIsOpenChange": (changes) => {
    console.log("Dropdown menu changes: " + changes);
  }
}`,
  onIsOpenChangeDescription
);
disableStoryActions(OnIsOpenChange);
