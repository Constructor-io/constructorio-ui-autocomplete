import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import {
  CioAutocompleteProps,
  CioClientConfig,
  Item,
  RecommendationsSection,
  Section,
} from '../types';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import usePrevious from './usePrevious';
import { getItemPosition } from '../utils';

export const defaultSections: Section[] = [
  {
    identifier: 'Search Suggestions',
    type: 'autocomplete',
  },
  {
    identifier: 'Products',
    type: 'autocomplete',
  },
];

export type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;

const useCioAutocomplete = (options: UseCioAutocompleteOptions) => {
  const defaultPlaceholder = 'What can we help you find today?';
  const {
    onSubmit,
    onChange,
    openOnFocus,
    apiKey,
    cioJsClient,
    placeholder = defaultPlaceholder,
    sections = defaultSections,
    zeroStateSections,
    autocompleteClassName = 'cio-autocomplete',
  } = options;

  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientConfig);

  const zeroStateSectionsActive = !query.length && zeroStateSections;

  let activeSections = zeroStateSectionsActive ? zeroStateSections : sections;

  if (sections && !Array.isArray(sections)) {
    // eslint-disable-next-line
    console.error(
      'useCioAutocomplete expects sections to reference an array of section configuration objects'
    );
    activeSections = [];
  }

  if (zeroStateSections && !Array.isArray(zeroStateSections)) {
    // eslint-disable-next-line
    console.error(
      'useCioAutocomplete expects zeroStateSections to reference an array of section configuration objects'
    );
    activeSections = [];
  }

  const autocompleteSections = activeSections?.filter(
    (config: Section) => config.type === 'autocomplete' || !config.type
  );
  const recommendationsSections = activeSections?.filter(
    (config: Section) => config.type === 'recommendations'
  ) as RecommendationsSection[];

  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const sectionResults = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionsWithData: Section[] = [];

  activeSections?.forEach((config) => {
    const { identifier, data: customData } = config;
    const data = sectionResults[identifier] || customData;

    if (data && data !== undefined) {
      activeSectionsWithData.push({ ...config, data });
    }
  });

  const items: Item[] = [];

  activeSectionsWithData?.forEach((config: Section) => {
    if (config?.data) {
      items.push(...config.data);
    }
  });

  const downshift = useDownShift({ setQuery, onChange, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu, highlightedIndex } = downshift;

  return {
    query,
    sections: activeSectionsWithData,
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
      const { index, sectionId } = getItemPosition({ item, activeSectionsWithData });
      const sectionItemTestId = `cio-item-${sectionId?.replace(' ', '')}`;

      return {
        ...downshift.getItemProps({ item, index }),
        className: `cio-item ${sectionItemTestId}`,
        'data-testid': sectionItemTestId,
      };
    },
    getInputProps: () => ({
      ...downshift.getInputProps(),
      value: query,
      onFocus: () => {
        if (options.onFocus) {
          options.onFocus();
        }
        if (zeroStateSectionsActive && openOnFocus !== false) {
          downshift.openMenu();
        }
        if (query?.length) {
          downshift.openMenu();
        }
        cioClient?.tracker?.trackInputFocus();
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
          cioClient?.tracker.trackSearchSubmit(query, { original_query: query });
        }
      },
    }),
    getFormProps: () => ({
      onSubmit: (event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit({ query });
        }
        cioClient?.tracker.trackSearchSubmit(query, { original_query: query });
        return { query };
      },
      className: 'cio-form',
      'data-testid': 'cio-form',
    }),
    setQuery,
    cioClient,
    autocompleteClassName,
    selectedItem: items[highlightedIndex],
  };
};

export default useCioAutocomplete;
