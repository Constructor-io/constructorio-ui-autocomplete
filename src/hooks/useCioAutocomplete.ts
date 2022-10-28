import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import {
  CioClientOptions,
  UseCioAutocompleteOptions,
  ICioAutocomplete,
  Item,
  SectionOrder,
  AutocompleteResultSections,
  SectionConfiguration,
} from '../types';
import usePrevious from './usePrevious';
import { getIndexOffset } from '../utils';

const defaultPlaceholder = 'What can we help you find today?';

type UseCioAutocomplete = (options: UseCioAutocompleteOptions) => ICioAutocomplete;

const useCioAutocomplete: UseCioAutocomplete = (options) => {
  const {
    onSubmit,
    openOnFocus,
    apiKey,
    cioJsClient,
    placeholder = defaultPlaceholder,
    sectionConfigurations,
    zeroStateSectionConfigurations,
  } = options;
  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions);


  const items: Item[] = [];

  const zeroStateSectionsActive = !query.length && zeroStateSectionConfigurations;

  const activeSectionConfigurations = zeroStateSectionsActive ? zeroStateSectionConfigurations : sectionConfigurations;

  const autocompleteSections = activeSectionConfigurations?.filter((config: SectionConfiguration) => config.type === 'autocomplete');
  const recommendationsSections = activeSectionConfigurations?.filter((config: SectionConfiguration) => config.type === 'recommendations');

  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const activeSections = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionConfigurationsWithData:SectionConfiguration[] = [];

  activeSectionConfigurations.forEach((config) => {
    const { identifier } = config;
    const data= activeSections[identifier];

    if (data && data !== undefined){
      activeSectionConfigurationsWithData.push({ ...config, data });
    }

  });
  const activeSectionOrder = activeSectionConfigurations?.map((config: SectionConfiguration) => (config.identifier)) || [];

  activeSectionOrder.forEach((sectionName: string) => {
     const sectionItems = activeSections[sectionName] || [];
     items.push(...sectionItems);
  });

  const downshift = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu } = downshift;

  return {
    query,
    sections: activeSectionConfigurationsWithData,
    isOpen,
    getMenuProps,
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: ({ item, index = 0, sectionName = 'Products' }) => {
      const indexOffset = getIndexOffset({ activeSections, activeSectionOrder, sectionName });
      return downshift.getItemProps({ item, index: index + indexOffset });
    },
    getInputProps: () => ({
      ...downshift.getInputProps(),
      value: query,
      onFocus: () => {
        if (options.onFocus) {
          options.onFocus();
        }
        if (openOnFocus) {
          downshift.openMenu();
        }
        cioClient?.tracker?.trackInputFocus();
      },
      className: 'cio-autocomplete__input',
      placeholder: placeholder,
    }),
    getFormProps: () => ({
      ...downshift.getComboboxProps(),
      onSubmit: (event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit({ query });
        }
        cioClient?.tracker.trackSearchSubmit(query, { original_query: query });
        return { query };
      },
    }),
    setQuery,
    cioClient,
  };
};

export default useCioAutocomplete;
