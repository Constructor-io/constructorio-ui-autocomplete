import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils';
import {
  customSectionDescription,
  multipleSectionsDescription,
  openOnFocusDescription,
  recommendationsDescription,
  zeroStateDescription,
  apiKey,
  onSubmitDefault as onSubmit,
} from '../../../constants';
import { HooksTemplate, getHookStoryParams, addHookStoryCode } from '.';

export default {
  title: 'Autocomplete/Hook/Zero State',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: zeroStateDescription,
      },
    },
  },
};

export const Default = HooksTemplate.bind({});
Default.args = { apiKey, onSubmit };
Default.parameters = getHookStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

export const RenderSections = HooksTemplate.bind({});
RenderSections.args = {
  apiKey,
  onSubmit,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
      numResults: 5,
    },
  ],
};
addHookStoryCode(
  RenderSections,
  `const args = ${stringifyWithDefaults(RenderSections.args)}`,
  zeroStateDescription,
);

export const NoOpenOnFocus = HooksTemplate.bind({});
NoOpenOnFocus.args = {
  apiKey,
  onSubmit,
  openOnFocus: false,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
addHookStoryCode(
  NoOpenOnFocus,
  `const args = ${stringifyWithDefaults(NoOpenOnFocus.args)}`,
  openOnFocusDescription,
);

export const RenderRecommendations = HooksTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  onSubmit,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
addHookStoryCode(
  RenderRecommendations,
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription,
);

export const RenderCustomSection = HooksTemplate.bind({});
RenderCustomSection.args = {
  apiKey,
  onSubmit,
  zeroStateSections: [
    {
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1',
          },
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
addHookStoryCode(
  RenderCustomSection,
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription,
);

export const RenderMultipleSections = HooksTemplate.bind({});
RenderMultipleSections.args = {
  apiKey,
  onSubmit,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
    {
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Red T-shirt',
          data: {
            id: '1',
          },
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
addHookStoryCode(
  RenderMultipleSections,
  `const args = ${stringifyWithDefaults(RenderMultipleSections.args)}`,
  multipleSectionsDescription,
);
