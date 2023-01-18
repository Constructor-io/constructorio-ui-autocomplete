import React from 'react';
import CioAutocomplete from '../../../components/Autocomplete/CioAutocomplete';
import { CioAutocompleteProps } from '../../../components/Autocomplete/CioAutocompleteProvider';
import { getStoryParams } from '../../../utils';

export function ComponentTemplate(args: CioAutocompleteProps) {
  return <CioAutocomplete {...args} />;
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
const importComponent = `import { CioAutocomplete } from 'cio-autocomplete-ts';`;

export const getComponentStoryParams = (storyParams) =>
  getStoryParams(storyParams, componentTemplateCode, importComponent);

export const addComponentStoryDescription = (story, code, description = '') => {
  story.parameters = getComponentStoryParams(code); // eslint-disable-line
  story.parameters.docs.description = { // eslint-disable-line
    story: `
${description}

\`\`\`jsx
${code}
\`\`\``
  };
};
