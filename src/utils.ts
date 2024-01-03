import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  AutocompleteRequestType,
  Nullable,
  ConstructorClientOptions,
} from '@constructor-io/constructorio-client-javascript/lib/types';
import { isRecommendationsSection } from './typeGuards';
import { Item, Section, UserDefinedSection, SectionsData, Translations } from './types';
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
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase());

export const toKebabCase = (str: string): string =>
  str
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/ [\s_]+/g, '-')
    .toLowerCase();

export function isTrackingRequestSent(trackingRequestUrl: string) {
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
export function sleep(ms: number) {
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

export const stringifyWithDefaults = (obj) => {
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
  if (apiKey && typeof window !== 'undefined') {
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
  sectionResults: SectionsData,
  sectionsRefs: React.MutableRefObject<React.RefObject<HTMLLIElement>[]>
) => {
  const activeSectionsWithData: Section[] = [];

  activeSections?.forEach((sectionConfig, index) => {
    const { type } = sectionConfig;
    let sectionData: Item[];

    switch (type) {
      case 'recommendations':
        sectionData = sectionResults[sectionConfig.podId];
        break;
      case 'custom':
        // Copy id from data to the top level
        sectionData = sectionConfig.data.map((item: Item) => ({
          ...item,
          id: item?.id || item?.data?.id,
        }));
        break;
      default:
        // Autocomplete
        sectionData = sectionResults[sectionConfig.indexSectionName];
    }

    if (Array.isArray(sectionData)) {
      const section = {
        ...sectionConfig,
        data: sectionData,
      };

      // If ref passed as part of `SectionConfiguration`, use it.
      // Otherwise, use the ref from our library generated refs array
      const userDefinedSectionRef = sectionConfig.ref;
      const libraryGeneratedSectionRef = sectionsRefs.current[index];
      section.ref = userDefinedSectionRef || libraryGeneratedSectionRef;

      activeSectionsWithData.push(section);
    }
  });

  return activeSectionsWithData;
};

export const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const trackRecommendationView = (
  target: HTMLElement,
  activeSectionsWithData: Section[],
  cioClient: Nullable<ConstructorIOClient>
) => {
  if (target.dataset.cnstrcRecommendationsPodId) {
    // Pull recommendations from activeSectionsWithData by podId surfaced on target
    const recommendationSection = activeSectionsWithData.find(
      (section) =>
        isRecommendationsSection(section) &&
        section.podId === target.dataset.cnstrcRecommendationsPodId
    );
    const recommendationItems = recommendationSection?.data.map((item) => ({
      itemId: item.data?.id,
      itemName: item.value,
      variationId: item.data?.variation_id,
    }));

    cioClient?.tracker.trackRecommendationView({
      podId: target.dataset.cnstrcRecommendationsPodId,
      numResultsViewed: recommendationItems?.length || 0,
      url: window.location.href,
      section: target.dataset.cnstrcSection,
      items: recommendationItems,
    });
  }
};

export const getItemsForActiveSections = (activeSectionsWithData: Section[]) => {
  const items: Item[] = [];
  activeSectionsWithData?.forEach((config: Section) => {
    if (config?.data) {
      items.push(...config.data);
    }
  });

  return items;
};

export const translate = (word: string, translations?: Translations) => {
  const localTranslations: Translations = {
    in: 'in',
  };

  if (translations) return translations[word];

  return localTranslations[word] || word;
};
