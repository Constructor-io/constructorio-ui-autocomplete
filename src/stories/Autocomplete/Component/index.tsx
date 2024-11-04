import React from 'react';
import { CioAutocomplete } from '../../../index';
import { CioAutocompleteProps } from '../../../types';
import { getStoryParams } from '../../../utils';

const groupIds = ['1129', '1130', '1131', '1132', '1135', '1136'];
export function ComponentTemplateWithDynamicZeroStateSections(args: CioAutocompleteProps) {
  const [groupIdIndex, setGroupIdIndex] = React.useState<number>(0);

  const zeroStateSection = {
    podId: 'bestsellers',
    type: 'recommendations',
    numResults: 3,
    filters: {
      group_id: groupIds[groupIdIndex],
    },
  } as const;

  return (
    <>
      <CioAutocomplete
        {...{
          ...args,
          zeroStateSections: [zeroStateSection],
          placeholder: `Current zero state on group id ${groupIds[groupIdIndex]}`,
        }}
      />
      <button
        type='button'
        style={{
          margin: '0 20px',
        }}
        onClick={() => {
          if (groupIdIndex === groupIds.length - 1) {
            setGroupIdIndex(0);
          } else {
            setGroupIdIndex(groupIdIndex + 1);
          }
        }}>
        Change Zero State Filters
      </button>
    </>
  );
}

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
