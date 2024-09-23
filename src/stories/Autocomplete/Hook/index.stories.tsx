import type { Meta } from '@storybook/react';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { HooksTemplate } from '.';

const meta: Meta<typeof HooksTemplate> = {
  title: 'Autocomplete/Hook',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const BasicUsage = HooksTemplate.bind({});

export default meta;
