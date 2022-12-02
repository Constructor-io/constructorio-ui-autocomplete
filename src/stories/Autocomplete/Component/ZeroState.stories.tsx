import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { ComponentTemplate, getComponentStoryParams, apiKey } from '.';

export default {
  title: 'Autocomplete/Component/Zero State',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes
} as ComponentMeta<typeof CioAutocomplete>;

export const ZeroStateSections = ComponentTemplate.bind({});
ZeroStateSections.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
ZeroStateSections.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
}`);

export const NoOpenOnFocus = ComponentTemplate.bind({});
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
NoOpenOnFocus.parameters = getComponentStoryParams(`
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

export const Recommendations = ComponentTemplate.bind({});
Recommendations.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
Recommendations.parameters = getComponentStoryParams(`
const args = {
  apiKey: 'key_jaqzPcUDnK66puIO',
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
}`);

export const CustomSection = ComponentTemplate.bind({});
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
CustomSection.parameters = getComponentStoryParams(`
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

export const MultipleSections = ComponentTemplate.bind({});
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
MultipleSections.parameters = getComponentStoryParams(`
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
