import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { SectionItemsList, SectionItem, SearchInput } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import {
  customSectionDescription,
  multipleSectionsDescription,
  openOnFocusDescription,
  recommendationsDescription,
  zeroStateDescription,
  zeroStateSectionsDescription
} from '../../../constants';
import {
  ComponentTemplate,
  getComponentStoryParams,
  addComponentStoryDescription,
  apiKey
} from '.';

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
};

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getComponentStoryParams(`const args = ${stringify(Default.args)}`);

export const ZeroStateSections = ComponentTemplate.bind({});
ZeroStateSections.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
      numResults: 3
    }
  ]
};
addComponentStoryDescription(
  ZeroStateSections,
  `const args = ${stringify(ZeroStateSections.args)}`,
  zeroStateSectionsDescription
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
addComponentStoryDescription(
  NoOpenOnFocus,
  `const args = ${stringify(NoOpenOnFocus.args)}`,
  openOnFocusDescription
);

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
addComponentStoryDescription(
  Recommendations,
  `const args = ${stringify(Recommendations.args)}`,
  recommendationsDescription
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
addComponentStoryDescription(
  CustomSection,
  `const args = ${stringify(CustomSection.args)}`,
  customSectionDescription
);

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
addComponentStoryDescription(
  MultipleSections,
  `const args = ${stringify(MultipleSections.args)}`,
  multipleSectionsDescription
);
