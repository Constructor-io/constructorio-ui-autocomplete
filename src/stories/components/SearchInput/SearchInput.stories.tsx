import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CioAutocomplete, AutocompleteResults, SearchInput } from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'Render function that receives prop getters for building custom input UI.',
      table: {
        type: {
          summary:
            '(args: { getFormProps, getInputProps, getLabelProps, setQuery }) => ReactElement',
        },
      },
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
      <SearchInput>
        {({ getFormProps, getInputProps, getLabelProps, setQuery }) => {
          const inputProps = getInputProps();
          return (
            <form {...getFormProps()}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label {...getLabelProps()} htmlFor='custom-input'>
                Search:
              </label>
              <input id='custom-input' {...inputProps} placeholder='Type to search...' />
              <button type='submit'>Go</button>
              <button type='button' onClick={() => setQuery('')}>
                Clear
              </button>
            </form>
          );
        }}
      </SearchInput>
      <AutocompleteResults />
    </CioAutocomplete>
  ),
};
