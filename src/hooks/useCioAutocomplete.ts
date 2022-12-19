import { useState } from 'react';
import useCioClient, { CioClientOptions } from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import { Item } from '../types';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import { SectionConfiguration } from '../types';
import usePrevious from './usePrevious';
import { getIndexOffset } from '../utils';
import { CioAutocompleteProps } from '../components/Autocomplete/CioAutocompleteProvider';

export const defaultSections: SectionConfiguration[] = [
  {
    identifier: 'Search Suggestions',
    type: 'autocomplete'
  },
  {
    identifier: 'Products',
    type: 'autocomplete'
  }
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
    zeroStateSections
  } = options;

  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions);

  const zeroStateSectionsActive = !query.length && zeroStateSections;

  let activeSections = zeroStateSectionsActive ? zeroStateSections : sections;

  if (sections && !Array.isArray(sections)) {
    console.error(
      'useCioAutocomplete expects sections to reference an array of section configuration objects'
    );
    activeSections = [];
  }

  if (zeroStateSections && !Array.isArray(zeroStateSections)) {
    console.error(
      'useCioAutocomplete expects zeroStateSections to reference an array of section configuration objects'
    );
    activeSections = [];
  }

  const autocompleteSections = activeSections?.filter(
    (config: SectionConfiguration) => config.type === 'autocomplete' || !config.type
  );
  const recommendationsSections = activeSections?.filter(
    (config: SectionConfiguration) => config.type === 'recommendations'
  );

  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const sectionResults = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionsWithData: SectionConfiguration[] = [];

  activeSections?.forEach((config) => {
    const { identifier, data: customData } = config;
    const data = sectionResults[identifier] || customData;

    if (data && data !== undefined) {
      activeSectionsWithData.push({ ...config, data });
    }
  });

  const items: Item[] = [];

  activeSectionsWithData?.forEach((config: SectionConfiguration) => {
    if (config?.data) {
      items.push(...config.data);
    }
  });

  const downshift = useDownShift({ setQuery, onChange, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu } = downshift;

  return {
    query,
    sections: activeSectionsWithData,
    isOpen,
    getMenuProps: () => ({
      ...getMenuProps(),
      className: 'cio-results',
      'data-testid': 'cio-results'
    }),
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: ({ item, index = 0, sectionIdentifier = 'Products' }) => {
      const indexOffset = getIndexOffset({
        activeSections: activeSectionsWithData,
        sectionIdentifier
      });
      return {
        ...downshift.getItemProps({ item, index: index + indexOffset }),
        className: 'cio-item',
        'data-testid': `cio-item-${sectionIdentifier.replace(' ', '')}`
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
        cioClient?.tracker?.trackInputFocus();
      },
      className: 'cio-input',
      'data-testid': 'cio-input',
      placeholder: placeholder
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
      'data-testid': 'cio-form'
    }),
    setQuery,
    cioClient
  };
};

export default useCioAutocomplete;
