import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { ConstructorClientOptions } from '@constructor-io/constructorio-client-javascript/lib/types';
import { Item, Section, UserDefinedSection, SectionsData, Translations, PodData } from '../types';
import version from '../version';

export type GetItemPosition = (args: { item: Item; items: Item[] }) => {
  index: number;
  sectionId: string;
};

export const getItemPosition: GetItemPosition = ({ item, items }) => {
  const index = items.findIndex((itemInFlatList) => itemInFlatList?.id === item?.id);
  const sectionId = items[index]?.section;
  return { sectionId, index };
};

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
  renderItem: `({ item, query, getItemProps }) => (
                      <div {...getItemProps(item)}>
                          <a href={item.data?.url}>
                            <h3>{item.value}</h3>
                            <img src={item.data?.image_url} alt={item.value} />
                          </a>
                          <p>{item.data?.price}</p>
                      </div>
                    )`,
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
      eventDispatcher: { waitForBeacon: false },
    });

    // eslint-disable-next-line no-console
    cioClient.tracker.on('error', (error) => console.error(error));
    return cioClient;
  }

  return null;
};

export const getActiveSectionsWithData = (
  activeSections: UserDefinedSection[],
  sectionsResults: SectionsData,
  sectionsRefs: React.MutableRefObject<React.RefObject<HTMLLIElement>[]>,
  podsData: Record<string, PodData>
) => {
  const activeSectionsWithData: Section[] = [];

  const getSectionData = (sectionConfig) => {
    const { type } = sectionConfig;
    let sectionData: Item[];

    switch (type) {
      case 'recommendations':
        sectionData = sectionsResults[sectionConfig.podId];
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
        sectionData = sectionsResults[sectionConfig.indexSectionName];
    }

    return sectionData;
  };

  activeSections?.forEach((sectionConfig, index) => {
    const sectionData = getSectionData(sectionConfig);

    if (Array.isArray(sectionData)) {
      const section = {
        ...sectionConfig,
        data: sectionData,
      };

      if (sectionConfig.type === 'recommendations') {
        section.displayName =
          sectionConfig.displayName || podsData[sectionConfig.podId].displayName;
      }

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
    'show all results': 'show all results',
  };

  if (translations) return translations[word];

  return localTranslations[word] || word;
};

export const logger = (error: any) => {
  try {
    if (typeof process !== 'undefined' && process?.env?.LOGGER) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  } catch (e) {
    // process variable is not available and logger should not be active
  }
};
