import { ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { HooksTemplate, getHookStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/Zero State',
  component: CioAutocomplete,
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const ZeroStateSections = HooksTemplate.bind({});
ZeroStateSections.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
ZeroStateSections.parameters = getHookStoryParams(
  `const args = ${stringify(ZeroStateSections.args)}`
);

export const NoOpenOnFocus = HooksTemplate.bind({});
NoOpenOnFocus.args = {
  apiKey,
  openOnFocus: false,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
NoOpenOnFocus.parameters = getHookStoryParams(`const args = ${stringify(NoOpenOnFocus.args)}`);

export const Recommendations = HooksTemplate.bind({});
Recommendations.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
Recommendations.parameters = getHookStoryParams(`const args = ${stringify(Recommendations.args)}`);

export const CustomSection = HooksTemplate.bind({});
CustomSection.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'recent_searches',
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1'
          }
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2'
          }
        }
      ]
    }
  ]
};
CustomSection.parameters = getHookStoryParams(`const args = ${stringify(CustomSection.args)}`);

export const MultipleSections = HooksTemplate.bind({});
MultipleSections.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    },
    {
      identifier: 'recent_searches',
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1'
          }
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2'
          }
        }
      ]
    }
  ]
};
MultipleSections.parameters = getHookStoryParams(
  `const args = ${stringify(MultipleSections.args)}`
);
