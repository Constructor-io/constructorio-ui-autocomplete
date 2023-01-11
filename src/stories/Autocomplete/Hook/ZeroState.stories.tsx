import { CioAutocomplete } from '../../../components';
import { argTypes } from '../argTypes';
import { stringify } from '../../../utils';
import {
  customSectionDescription,
  multipleSectionsDescription,
  openOnFocusDescription,
  recommendationsDescription,
  zeroStateDescription,
  apiKey
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode } from '.';

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
};

export const Default = HooksTemplate.bind({});
Default.args = { apiKey };
Default.parameters = getHookStoryParams(`const args = ${stringify(Default.args)}`);

export const RenderSections = HooksTemplate.bind({});
RenderSections.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
      numResults: 5
    }
  ]
};
addHookStoryCode(
  RenderSections,
  `const args = ${stringify(RenderSections.args)}`,
  zeroStateDescription
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
addHookStoryCode(
  NoOpenOnFocus,
  `const args = ${stringify(NoOpenOnFocus.args)}`,
  openOnFocusDescription
);

export const RenderRecommendations = HooksTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations'
    }
  ]
};
addHookStoryCode(
  RenderRecommendations,
  `const args = ${stringify(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = HooksTemplate.bind({});
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
addHookStoryCode(
  RenderCustomSection,
  `const args = ${stringify(RenderCustomSection.args)}`,
  customSectionDescription
);

export const RenderMultipleSections = HooksTemplate.bind({});
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
addHookStoryCode(
  RenderMultipleSections,
  `const args = ${stringify(RenderMultipleSections.args)}`,
  multipleSectionsDescription
);
