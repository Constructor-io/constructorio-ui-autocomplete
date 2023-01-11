import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import {
  customSectionDescription,
  multipleSectionsDescription,
  openOnFocusDescription,
  recommendationsDescription,
  zeroStateDescription,
  zeroStateSectionsDescription,
  apiKey
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/Zero State',
  component: CioAutocomplete,
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

export const RenderSections = ComponentTemplate.bind({});
RenderSections.args = {
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
  RenderSections,
  `const args = ${stringify(RenderSections.args)}`,
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

export const RenderRecommendations = ComponentTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
addComponentStoryDescription(
  RenderRecommendations,
  `const args = ${stringify(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
RenderCustomSection.args = {
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
  RenderCustomSection,
  `const args = ${stringify(RenderCustomSection.args)}`,
  customSectionDescription
);

export const RenderMultipleSections = ComponentTemplate.bind({});
RenderMultipleSections.args = {
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
  RenderMultipleSections,
  `const args = ${stringify(RenderMultipleSections.args)}`,
  multipleSectionsDescription
);
