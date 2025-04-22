import React from 'react';
import { CioAutocomplete } from '../../../index';
import { CioAutocompleteProps } from '../../../types';
import { getStoryParams } from '../../../utils/helpers';

export function ComponentTemplate(args: CioAutocompleteProps) {
  return <CioAutocomplete {...args} />;
}

export function FullExampleTemplate(args: CioAutocompleteProps) {
  return (
    <div className='cio-autocomplete full-example-autocomplete-styles header'>
      <svg viewBox='0 0 70 45' width='35' height='35' fill='darkgray' className='menu-icon'>
        <rect width='70' height='5' />
        <rect y='20' width='70' height='5' />
        <rect y='40' width='70' height='5' />
      </svg>
      <CioAutocomplete {...args} />
    </div>
  );
}

const componentTemplateCode = `
function YourComponent() {
  return (
    <div>
      <CioAutocomplete {...args} />
    </div>
  );
}
`;
const importComponent = `import { CioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';`;

export const getComponentStoryParams = (storyParams) =>
  getStoryParams(storyParams, componentTemplateCode, importComponent);

export const addComponentStoryDescription = (story, code, description = '') => {
  story.parameters = getComponentStoryParams(code); // eslint-disable-line
  story.parameters.docs.description = { // eslint-disable-line
    story: `
${description}

\`\`\`jsx
${code}
\`\`\``,
  };
};
