import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CioAutocomplete, CioAutocompleteProps } from '../../../index';
import { componentDescription, apiKey } from '../../../constants';

const meta: Meta<typeof CioAutocomplete> = {
  title: 'Components/CioAutocomplete',
  component: CioAutocomplete,
  parameters: {
    docs: {
      description: {
        component: componentDescription,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function StoryTemplate({ args }: { args: CioAutocompleteProps }) {
  return <CioAutocomplete {...args} />;
}

export const PrimaryStory: Story = {
  render: (args) => <StoryTemplate args={args} />,
  args: {
    apiKey,
  },
};
