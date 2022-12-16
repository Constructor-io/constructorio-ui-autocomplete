import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import { zeroStateDescription } from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryCode, apiKey } from '.';

export default {
  title: 'Autocomplete/Component/Zero State',
  component: CioAutocomplete,
  subcomponents: { SearchInput, SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    docs: {
      description: {
        component: zeroStateDescription
      }
    }
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

export const ZeroStateSections = ComponentTemplate.bind({});
ZeroStateSections.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
addComponentStoryCode(ZeroStateSections, `const args = ${stringify(ZeroStateSections.args)}`);

export const NoOpenOnFocus = ComponentTemplate.bind({});
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
addComponentStoryCode(NoOpenOnFocus, `const args = ${stringify(NoOpenOnFocus.args)}`);

export const Recommendations = ComponentTemplate.bind({});
Recommendations.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
addComponentStoryCode(Recommendations, `const args = ${stringify(Recommendations.args)}`);

export const CustomSection = ComponentTemplate.bind({});
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
addComponentStoryCode(CustomSection, `const args = ${stringify(CustomSection.args)}`);

export const MultipleSections = ComponentTemplate.bind({});
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
addComponentStoryCode(MultipleSections, `const args = ${stringify(MultipleSections.args)}`);
