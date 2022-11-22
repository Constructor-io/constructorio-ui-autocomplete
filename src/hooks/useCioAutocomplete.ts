import { useState } from 'react';
import useCioClient, { CioClientOptions } from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import { Item, SectionOrder, AutocompleteResultSections } from '../types';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import { SectionConfiguration } from '../types';
import usePrevious from './usePrevious';
import { getIndexOffset } from '../utils';
import { CioAutocompleteProps } from '../components/Autocomplete/CioAutocompleteProvider';

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
    sectionConfigurations,
    zeroStateSectionConfigurations
  } = options;

  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions);

  const zeroStateSectionsActive = !query.length && zeroStateSectionConfigurations;

  const activeSectionConfigurations = zeroStateSectionsActive
    ? zeroStateSectionConfigurations
    : sectionConfigurations;

  const autocompleteSections = activeSectionConfigurations?.filter(
    (config: SectionConfiguration) => config.type === 'autocomplete' || !config.type
  );
  const recommendationsSections = activeSectionConfigurations?.filter(
    (config: SectionConfiguration) => config.type === 'recommendations'
  );

  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const activeSections = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionConfigurationsWithData: SectionConfiguration[] = [];

  activeSectionConfigurations?.forEach((config) => {
    const { identifier, data: customData } = config;
    const data = activeSections[identifier] || customData;

    if (data && data !== undefined) {
      activeSectionConfigurationsWithData.push({ ...config, data });
    }
  });

  const items: Item[] = [];

  activeSectionConfigurationsWithData?.forEach((config: SectionConfiguration) => {
    if (config?.data) {
      items.push(...config.data);
    }
  });

  const downshift = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu, getComboboxProps } = downshift;

  return {
    query,
    sections: activeSectionConfigurationsWithData,
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
        activeSectionConfigurations: activeSectionConfigurationsWithData,
        sectionIdentifier
      });
      return {
        ...downshift.getItemProps({ item, index: index + indexOffset }),
        className: 'cio-item',
        'data-testid': 'cio-item'
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
      ...getComboboxProps(),
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
