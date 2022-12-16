import { ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { zeroStateDescription } from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/Zero State',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: zeroStateDescription
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = HooksTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getHookStoryParams(`const args = ${stringify(Default.args)}`);

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
addHookStoryCode(ZeroStateSections, `const args = ${stringify(ZeroStateSections.args)}`);

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
addHookStoryCode(NoOpenOnFocus, `const args = ${stringify(NoOpenOnFocus.args)}`);

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
addHookStoryCode(Recommendations, `const args = ${stringify(Recommendations.args)}`);

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
addHookStoryCode(CustomSection, `const args = ${stringify(CustomSection.args)}`);

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
addHookStoryCode(MultipleSections, `const args = ${stringify(MultipleSections.args)}`);
