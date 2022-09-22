import { GetIndexOffset } from './types';

export const getIndexOffset: GetIndexOffset = ({ sections, sectionOrder, sectionName }) => {
  let indexOffset = 0;
  sectionOrder.find((name) => {
    if (name === sectionName) return true; // break out of loop
    indexOffset += sections?.[name]?.length || 0;
    return false; // continue
  });
  return indexOffset;
};

type CamelToStartCase = (camelCaseString: string) => string;

export const camelToStartCase: CamelToStartCase = (camelCaseString) => camelCaseString
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });