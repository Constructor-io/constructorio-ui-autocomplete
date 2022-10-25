import { AutocompleteResultSections, SectionOrder } from './types';

export type GetIndexOffset = (args: {
  activeSections?: AutocompleteResultSections;
  activeSectionOrder: SectionOrder;
  sectionName: string;
}) => number;

export const getIndexOffset: GetIndexOffset = ({
  activeSections,
  activeSectionOrder,
  sectionName
}) => {
  let indexOffset = 0;

  if (sectionName) {
    activeSectionOrder.find((name) => {
      if (name === sectionName) return true; // break out of loop
      indexOffset += activeSections?.[name]?.length || 0;
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
