import { useMemo, useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import {
  CioAutocompleteProps,
  CioClientConfig,
  Section,
  UserDefinedSection,
  HTMLPropsWithCioDataAttributes,
} from '../types';
import usePrevious from './usePrevious';
import {
  getItemPosition,
  getItemsForActiveSections,
  getSearchSuggestionFeatures,
  trackRecommendationView,
  toKebabCase,
} from '../utils';
import useConsoleErrors from './useConsoleErrors';
import useSections from './useSections';
import useRecommendationsObserver from './useRecommendationsObserver';
import { isAutocompleteSection, isRecommendationsSection } from '../typeGuards';

export const defaultSections: UserDefinedSection[] = [
  {
    indexSectionName: 'Search Suggestions',
    type: 'autocomplete',
  },
  {
    indexSectionName: 'Products',
    type: 'autocomplete',
  },
];

export type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;

const convertLegacyParametersAndAddDefaults = (sections: UserDefinedSection[]) =>
  sections.map((config) => {
    if (isRecommendationsSection(config)) {
      if (config.identifier && !config.podId) {
        return { ...config, podId: config.identifier };
      }

      if (!config.indexSectionName) {
        return { ...config, indexSectionName: 'Products' };
      }
    }

    if (isAutocompleteSection(config)) {
      if (config.identifier && !config.indexSectionName) {
        return { ...config, indexSectionName: config.identifier };
      }
    }

    return config;
  });

const useCioAutocomplete = (options: UseCioAutocompleteOptions) => {
  const {
    onSubmit,
    onChange,
    openOnFocus,
    apiKey,
    cioJsClient,
    cioJsClientOptions,
    placeholder = 'What can we help you find today?',
    autocompleteClassName = 'cio-autocomplete',
    advancedParameters,
    defaultInput,
  } = options;

  let { sections = defaultSections, zeroStateSections } = options;

  sections = useMemo(() => {
    if (sections) {
      return convertLegacyParametersAndAddDefaults(sections);
    }

    return sections;
  }, [sections]);

  zeroStateSections = useMemo(() => {
    if (zeroStateSections) {
      return convertLegacyParametersAndAddDefaults(zeroStateSections);
    }

    return zeroStateSections;
  }, [zeroStateSections]);

  const [query, setQuery] = useState(defaultInput || '');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient, cioJsClientOptions } as CioClientConfig);

  // Get autocomplete sections (autocomplete + recommendations + custom)
  const { activeSections, activeSectionsWithData, zeroStateActiveSections, request } = useSections(
    query,
    cioClient,
    sections,
    zeroStateSections,
    advancedParameters
  );

  // Get dropdown items array from active sections (autocomplete + recommendations + custom)
  const items = useMemo(
    () => getItemsForActiveSections(activeSectionsWithData),
    [activeSectionsWithData]
  );
  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    openMenu,
    closeMenu,
    highlightedIndex,
    getInputProps,
    getItemProps,
  } = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });

  // Log console errors
  useConsoleErrors(sections, activeSections);

  // Track recommendation view
  useRecommendationsObserver(isOpen, activeSectionsWithData, cioClient, trackRecommendationView);

  return {
    query,
    sections: activeSectionsWithData,
    request,
    featureToggles: getSearchSuggestionFeatures(request),
    isOpen: isOpen && items?.length > 0,
    getMenuProps: () => ({
      ...getMenuProps(),
      className: 'cio-results',
      'data-testid': 'cio-results',
    }),
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: (item) => {
      const { index, sectionId } = getItemPosition({ item, items });
      const sectionItemTestId = `cio-item-${sectionId?.replace(' ', '')}`;

      return {
        ...getItemProps({ item, index }),
        className: `cio-item ${sectionItemTestId}`,
        'data-testid': sectionItemTestId,
      };
    },
    getInputProps: () => ({
      ...getInputProps({
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        },
      }),
      value: query,
      onFocus: () => {
        if (options.onFocus) {
          options.onFocus();
        }
        if (zeroStateActiveSections && openOnFocus !== false) {
          openMenu();
        }
        if (query?.length) {
          openMenu();
        }
        try {
          cioClient?.tracker?.trackInputFocus();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      },
      className: 'cio-input',
      'data-testid': 'cio-input',
      placeholder,
      onKeyDownCapture: ({ code }) => {
        const isEnter = code === 'Enter';
        const isUserInput = highlightedIndex < 0;
        if (isOpen && isEnter && isUserInput && query?.length) {
          if (onSubmit) {
            onSubmit({ query });
          }
          try {
            cioClient?.tracker.trackSearchSubmit(query, { originalQuery: query });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }
      },
    }),
    getFormProps: () => ({
      onSubmit: (event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit({ query });
        }
        try {
          cioClient?.tracker.trackSearchSubmit(query, { originalQuery: query });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
        return { query };
      },
      className: 'cio-form',
      'data-testid': 'cio-form',
    }),
    getSectionProps: (section: Section) => {
      const { type, displayName } = section;
      let sectionTitle = displayName;

      // Add the indexSectionName as a class to the section container to make sure it gets the styles
      // Even if the section is a recommendation pod, if the results are "Products" or "Search Suggestions"
      // ... they should be styled accordingly
      const indexSectionName =
        type !== 'custom' && section.indexSectionName ? toKebabCase(section.indexSectionName) : '';

      if (!sectionTitle) {
        switch (type) {
          case 'recommendations':
            sectionTitle = section.podId;
            break;
          case 'autocomplete':
            sectionTitle = section.indexSectionName;
            break;
          case 'custom':
            sectionTitle = section.displayName;
            break;
          default:
            sectionTitle = section.indexSectionName;
            break;
        }
      }

      const attributes: HTMLPropsWithCioDataAttributes = {
        className: `${sectionTitle} cio-section  ${indexSectionName}`,
        ref: section.ref,
        role: 'none',
        'data-cnstrc-section': section.data[0]?.section,
      };

      // Add data attributes for recommendations
      if (isRecommendationsSection(section)) {
        attributes['data-cnstrc-recommendations'] = true;
        attributes['data-cnstrc-recommendations-pod-id'] = section.podId;
      }
      return attributes;
    },
    setQuery,
    cioClient,
    autocompleteClassName,
    selectedItem: items[highlightedIndex],
    advancedParameters,
  };
};

export default useCioAutocomplete;
