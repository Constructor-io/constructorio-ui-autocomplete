import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CioAutocomplete,
  AutocompleteResults,
  SearchInput,
  SectionItemsList,
} from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';

const meta: Meta<typeof AutocompleteResults> = {
  title: 'Components/AutocompleteResults',
  component: AutocompleteResults,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description:
        'Render function or ReactNode. Function receives `{ sections, getItemProps }` for custom rendering.',
      table: { type: { summary: 'RenderResults | ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <CioAutocomplete apiKey={apiKey} onSubmit={onSubmit}>
      <SearchInput />
      <AutocompleteResults />
    </CioAutocomplete>
  ),
};

export const CustomRender: Story = {
  render: () => (
    <CioAutocomplete apiKey={apiKey} onSubmit={onSubmit}>
      <SearchInput />
      <AutocompleteResults>
        {({ sections }) =>
          sections?.map((section) => (
            <SectionItemsList
              section={section}
              key={section.displayName || section.indexSectionName}
            />
          ))
        }
      </AutocompleteResults>
    </CioAutocomplete>
  ),
};
