import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CioAutocomplete from '../../components/Autocomplete/CioAutocomplete';
import { CioAutocompleteProps } from '../../types';
import { SectionItemsList } from '../../components';
import { SectionItem } from '../../components';
import { argTypes } from './argTypes';

const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Autocomplete/Zero State',
  component: CioAutocomplete,
  subcomponents: { SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CioAutocomplete>;

const Template: ComponentStory<typeof CioAutocomplete> = (args: CioAutocompleteProps) => <CioAutocomplete {...args} />;

export const ZeroState = Template.bind({});
ZeroState.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
    },
  ],
};

export const ZeroStateWithOpenOnFocusFalse = Template.bind({});
ZeroStateWithOpenOnFocusFalse.args = {
  apiKey,
  openOnFocus: false,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
    },
  ],
};

export const ZeroStateWithCustomSection = Template.bind({});
ZeroStateWithCustomSection.args = {
  apiKey,
  zeroStateSectionConfigurations: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
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
            id: '1',
          }
        },
        {
          section: 'recent_searches',
          value: 'Dresses',
          data: {
            id: '2',
          }
        }
      ]
    },
  ],
};
