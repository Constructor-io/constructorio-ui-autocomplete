import { ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { HooksTemplate, getHookStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Hook/Zero State',
  component: CioAutocomplete,
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const ZeroStateSections = HooksTemplate.bind({});
ZeroStateSections.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
ZeroStateSections.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
}`);

export const NoOpenOnFocus = HooksTemplate.bind({});
NoOpenOnFocus.args = {
  apiKey,
  openOnFocus: false,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
NoOpenOnFocus.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  openOnFocus: false,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
}`);

export const Recommendations = HooksTemplate.bind({});
Recommendations.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
Recommendations.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
}`);

export const CustomSection = HooksTemplate.bind({});
CustomSection.args = {
  apiKey,
  zeroStateSectionConfigurations: [
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
CustomSection.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
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
}`);

export const MultipleSections = HooksTemplate.bind({});
MultipleSections.args = {
  apiKey,
  zeroStateSectionConfigurations: [
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
MultipleSections.parameters = getHookStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
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
}`);
