import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  AutocompleteRequestType,
  ConstructorClientOptions,
} from '@constructor-io/constructorio-client-javascript/lib/types';
import { isCustomSection } from './typeGuards';
import { OnSubmit, Item, Section, UserDefinedSection, SectionsData } from './types';
import version from './version';

export type GetItemPosition = (args: { item: Item; items: Item[] }) => {
  index: number;
  sectionId: string;
};

export function getSearchSuggestionFeatures(request: Partial<AutocompleteRequestType>) {
  let featureDisplaySearchSuggestionImages = false;
  let featureDisplaySearchSuggestionResultCounts = false;
  if (request?.features?.custom_autosuggest_ui === true) {
    switch (request?.feature_variants?.custom_autosuggest_ui) {
      case 'custom_autosuggest_ui_result_count':
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      case 'custom_autosuggest_ui_image':
        featureDisplaySearchSuggestionImages = true;
        break;
      case 'custom_autosuggest_ui_image_result_count':
        featureDisplaySearchSuggestionImages = true;
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      default:
        break;
    }
  }
  return {
    featureDisplaySearchSuggestionImages,
    featureDisplaySearchSuggestionResultCounts,
  };
}

export const getItemPosition: GetItemPosition = ({ item, items }) => {
  const index = items.findIndex((itemInFlatList) => itemInFlatList?.id === item?.id);
  const sectionId = items[index]?.section;
  return { sectionId, index };
};

type CamelToStartCase = (camelCaseString: string) => string;

export const camelToStartCase: CamelToStartCase = (camelCaseString) =>
  camelCaseString
    // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first letter
    .replace(/([a-zA-Z])/, (str) => str.toUpperCase());

export function isTrackingRequestSent(trackingRequestUrl) {
  // eslint-disable-next-line
  const trackingRequestsQueue = window.localStorage?._constructorio_requests;

  return (
    trackingRequestsQueue &&
    JSON.parse(trackingRequestsQueue)?.some((request) => request?.url?.includes(trackingRequestUrl))
  );
}

export function clearConstructorRequests() {
  // eslint-disable-next-line
  if (window.localStorage?._constructorio_requests) {
    window.localStorage.removeItem('_constructorio_requests');
  }
}

// Function to emulate pausing between interactions
export function sleep(ms) {
  // eslint-disable-next-line
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
export const getStoryParams = (storyCode, templateCode, importCode) => {
  const code = `
${importCode}
${storyCode}
${templateCode}
`;

  return {
    docs: {
      source: {
        code,
        language: 'jsx',
        format: true,
        type: 'code',
      },
    },
  };
};

export const functionStrings = {
  onSubmit: `(submitEvent) => console.dir(submitEvent)`,
};

export const stringifyWithDefaults = (obj: { apiKey: string; onSubmit: OnSubmit }) => {
  // Stringify non-function values normally. Add a template block for functions to be replaced later
  let res = JSON.stringify(
    obj,
    (key, value) => (value instanceof Function ? `${key}_CODE` : value),
    '  '
  );

  // Replace template blocks with function strings
  Array.from(res.matchAll(/"(\w*)_CODE"/g)).forEach((match) => {
    const [codePlaceholder, key] = match;
    const functionString = functionStrings[key];

    if (functionString) {
      res = res.replaceAll(codePlaceholder, functionString);
    } else {
      console.error(`Function string for ${key} not found.`); // eslint-disable-line
    }
  });

  return res;
};

export const disableStoryActions = (story) => {
  // eslint-disable-next-line
  story.parameters.actions = { argTypesRegex: null };
};

export const getCioClient = (apiKey?: string, cioJsClientOptions?: ConstructorClientOptions) => {
  if (apiKey) {
    const cioClient = new ConstructorIOClient({
      apiKey,
      sendTrackingEvents: true,
      version: `cio-ui-autocomplete-${version}`,
      ...cioJsClientOptions,
    });

    // eslint-disable-next-line no-console
    cioClient.tracker.on('error', (error) => console.error(error));
    return cioClient;
  }

  return null;
};

export const getActiveSectionsWithData = (
  activeSections: UserDefinedSection[],
  sectionResults: SectionsData
) => {
  const activeSectionsWithData: Section[] = [];
  activeSections?.forEach((config) => {
    const { identifier } = config;
    let data;

    if (isCustomSection(config)) {
      // Copy id from data to the top level
      data = config.data.map((item) => ({
        ...item,
        id: item?.id || item?.data?.id,
      }));
    } else {
      data = sectionResults[identifier];
    }

    if (Array.isArray(data)) {
      activeSectionsWithData.push({ ...config, data });
    }
  });

  return activeSectionsWithData;
};

export const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
