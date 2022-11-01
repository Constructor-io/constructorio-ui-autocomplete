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



  const zeroStateSectionsActive = !query.length && zeroStateSectionConfigurations;

  const activeSectionConfigurations = zeroStateSectionsActive ? zeroStateSectionConfigurations : sectionConfigurations;

  const autocompleteSections = activeSectionConfigurations?.filter((config: SectionConfiguration) => config.type === 'autocomplete' || !config.type);
  const recommendationsSections = activeSectionConfigurations?.filter((config: SectionConfiguration) => config.type === 'recommendations');

  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const activeSections = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionConfigurationsWithData:SectionConfiguration[] = [];

  activeSectionConfigurations?.forEach((config) => {
    const { identifier, data: customData } = config;
    const data = activeSections[identifier] || customData;

    if (data && data !== undefined){
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
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu } = downshift;

  return {
    query,
    sections: activeSectionConfigurationsWithData,
    isOpen,
    getMenuProps,
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: ({ item, index = 0, sectionIdentifier = 'Products' }) => {
      const indexOffset = getIndexOffset({ activeSectionConfigurations: activeSectionConfigurationsWithData, sectionIdentifier });
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
