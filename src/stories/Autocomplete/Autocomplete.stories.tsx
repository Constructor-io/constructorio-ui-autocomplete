import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CioAutocomplete from '../../components/Autocomplete/CioAutocomplete';
import { CioAutocompleteProps } from '../../types';
import { codeSnippet } from '../../snippets';
import { SectionItemsList } from '../../components';
import { SectionItem } from '../../components';
import { argTypes } from './argTypes';

const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Autocomplete/Base',
  component: CioAutocomplete,
  subcomponents: { SectionItemsList, SectionItem },
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        code: codeSnippet,
        language: "jsx",
        format: true,
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof CioAutocomplete>;

const Template: ComponentStory<typeof CioAutocomplete> = (args: CioAutocompleteProps) => <CioAutocomplete {...args} />;

export const Base = Template.bind({});
Base.args = {
  apiKey,
  openOnFocus: true,
  sectionConfigurations: [
    {
      identifier: 'Search Suggestions',
      type: 'autocomplete',
      numberOfResults: 4,
    },
    {
      identifier: 'item_detail',
      type: 'recommendations',
    },
    {
      identifier: 'Products',
      type: 'autocomplete',
      numberOfResults: 5,
    }
  ],
  zeroStateSectionConfigurations: [
    {
      identifier: 'item_detail',
      type: 'recommendations',
    },
    {
      identifier: 'recent_searches',
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          section: 'recent_searches',
          value: 'Dogs',
          data: {
            id: '1',
          }
        },
        {
          section: 'recent_searches',
          value: 'Cats',
          data: {
            id: '2',
          }
        }
      ]
    },
  ]
};
