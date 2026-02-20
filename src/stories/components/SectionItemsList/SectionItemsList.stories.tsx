import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CioAutocomplete,
  AutocompleteResults,
  SearchInput,
  SectionItemsList,
  SectionItem,
} from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';

const meta: Meta<typeof SectionItemsList> = {
  title: 'Components/SectionItemsList',
  component: SectionItemsList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    section: {
      description: 'The section data object containing items to render.',
      table: { type: { summary: 'Section' } },
    },
    children: {
      description: 'Render function that receives section data for custom rendering.',
      table: { type: { summary: 'RenderSectionItemsList' } },
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
              key={section.displayName || section.indexSectionName}>
              {({ section: sectionData }) => (
                <li className='custom-section'>
                  <h4>{sectionData.displayName || sectionData.indexSectionName}</h4>
                  <ul>
                    {sectionData.data?.map((item) => (
                      <SectionItem key={item?.data?.variation_id || item?.id} item={item} />
                    ))}
                  </ul>
                </li>
              )}
            </SectionItemsList>
          ))
        }
      </AutocompleteResults>
    </CioAutocomplete>
  ),
};
