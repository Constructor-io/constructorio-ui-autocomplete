import React from 'react';
import { ComponentStory } from '@storybook/react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { CioAutocompleteProps } from '../../../components/Autocomplete/CioAutocompleteProvider';
import { getStoryParams } from '../../../utils';

export const apiKey = 'key_jaqzPcUDnK66puIO';

export const ComponentTemplate: ComponentStory<typeof CioAutocomplete> = (
  args: CioAutocompleteProps
) => <CioAutocomplete {...args} />;

const componentTemplateCode = `
function YourComponent() {
  return (
    <div>
      <CioAutocomplete {...args} />
    </div>
  );
}
`;

export const getComponentStoryParams = (storyParams) =>
  getStoryParams(storyParams, componentTemplateCode);
