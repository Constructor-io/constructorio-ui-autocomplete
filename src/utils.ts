import { SectionConfiguration } from './types';

export type GetIndexOffset = (args: {
  activeSectionConfigurations: SectionConfiguration[];
  sectionIdentifier: string;
}) => number;

export const getIndexOffset: GetIndexOffset = ({
  activeSectionConfigurations,
  sectionIdentifier
}) => {
  let indexOffset = 0;

  if (sectionIdentifier) {
    activeSectionConfigurations.find((config: SectionConfiguration) => {
      if (config?.identifier === sectionIdentifier) return true; // break out of loop
      indexOffset += config?.data?.length || 0;
      return false; // continue
    });
  }

  return indexOffset;
};

type CamelToStartCase = (camelCaseString: string) => string;

export const camelToStartCase: CamelToStartCase = (camelCaseString) =>
  camelCaseString
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });

// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
export const getStoryParams = (storyCode, templateCode) => {
  const code = `${storyCode}

//////////////////////////////
${templateCode}`;

  return {
    layout: 'fullscreen',
    docs: {
      source: {
        code,
        language: 'jsx',
        format: true,
        type: 'code'
      }
    }
  };
};
