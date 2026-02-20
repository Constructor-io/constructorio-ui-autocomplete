import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CioAutocomplete, AutocompleteResults, SearchInput, SectionItem } from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';

const meta: Meta<typeof SectionItem> = {
  title: 'Components/SectionItem',
  component: SectionItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    item: {
      description: 'The item data to render (Product, SearchSuggestion, or custom item).',
      table: { type: { summary: 'Item' } },
    },
    children: {
      description: 'Custom content to render inside the item. Overrides default rendering.',
      table: { type: { summary: 'ReactNode' } },
    },
    displaySearchTermHighlights: {
      description: 'Whether to highlight matching search terms in the item text.',
      table: { type: { summary: 'boolean' } },
      control: { type: 'boolean' },
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

export const WithHighlights: Story = {
  render: () => (
    <CioAutocomplete
      apiKey={apiKey}
      onSubmit={onSubmit}
      sections={[
        {
          indexSectionName: 'Search Suggestions',
          displaySearchTermHighlights: true,
        },
        {
          indexSectionName: 'Products',
          displaySearchTermHighlights: true,
        },
      ]}>
      <SearchInput />
      <AutocompleteResults />
    </CioAutocomplete>
  ),
};
