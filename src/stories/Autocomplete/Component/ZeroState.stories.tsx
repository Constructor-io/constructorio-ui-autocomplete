import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils/format';
import {
  customSectionDescription,
  multipleSectionsDescription,
  openOnFocusDescription,
  recommendationsDescription,
  zeroStateDescription,
  zeroStateSectionsDescription,
  apiKey,
  onSubmitDefault as onSubmit,
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/Zero State',
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

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey, onSubmit };
Default.parameters = getComponentStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

export const RenderSections = ComponentTemplate.bind({});
RenderSections.args = {
  apiKey,
  onSubmit,
  zeroStateSections: [
    {
      podId: 'bestsellers',
      type: 'recommendations',
      numResults: 3,
    },
  ],
};
addComponentStoryDescription(
  RenderSections,
  `const args = ${stringifyWithDefaults(RenderSections.args)}`,
  zeroStateSectionsDescription
);

export const NoOpenOnFocus = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  NoOpenOnFocus,
  `const args = ${stringifyWithDefaults(NoOpenOnFocus.args)}`,
  openOnFocusDescription
);

export const RenderRecommendations = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  RenderRecommendations,
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  RenderCustomSection,
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription
);

export const RenderMultipleSections = ComponentTemplate.bind({});
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
addComponentStoryDescription(
  RenderMultipleSections,
  `const args = ${stringifyWithDefaults(RenderMultipleSections.args)}`,
  multipleSectionsDescription
);
