import { SectionConfiguration } from './types';

export type GetIndexOffset = (args: {
  activeSections: SectionConfiguration[];
  sectionIdentifier: string;
}) => number;

export const getIndexOffset: GetIndexOffset = ({ activeSections, sectionIdentifier }) => {
  let indexOffset = 0;

  if (sectionIdentifier) {
    activeSections.find((config: SectionConfiguration) => {
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

export function isTrackingRequestSent(trackingRequestUrl) {
  const trackingRequestsQueue = window.localStorage?._constructorio_requests;

  return (
    trackingRequestsQueue &&
    JSON.parse(trackingRequestsQueue)?.some((request) => request?.url?.includes(trackingRequestUrl))
  );
}

export function clearConstructorRequests() {
  if (window.localStorage?._constructorio_requests) {
    window.localStorage.removeItem('_constructorio_requests');
  }
}

// Function to emulate pausing between interactions
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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

export const stringify = (obj) => JSON.stringify(obj, null, '  ');
