import type { Meta } from '@storybook/react';
import { CioAutocomplete } from '../../../index';
import { argTypes, storiesControls } from '../argTypes';
import { HooksTemplate } from '.';
import { apiKey } from '../../../constants';

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
    controls: storiesControls,
  },
  args: {
    apiKey,
    onsubmit,
  },
};

export const BasicUsage = HooksTemplate.bind({});

export default meta;
