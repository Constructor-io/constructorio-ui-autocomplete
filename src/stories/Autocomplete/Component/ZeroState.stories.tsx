import { ComponentMeta } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
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
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
ZeroStateSections.parameters = getComponentStoryParams(
  `const args = ${stringify(ZeroStateSections.args)}`
);

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
NoOpenOnFocus.parameters = getComponentStoryParams(`const args = ${stringify(NoOpenOnFocus.args)}`);

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
Recommendations.parameters = getComponentStoryParams(
  `const args = ${stringify(Recommendations.args)}`
);

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
CustomSection.parameters = getComponentStoryParams(`const args = ${stringify(CustomSection.args)}`);

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
MultipleSections.parameters = getComponentStoryParams(
  `const args = ${stringify(MultipleSections.args)}`
);
