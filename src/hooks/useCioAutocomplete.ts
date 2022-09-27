import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import {
  CioClientOptions,
  UseCioAutocompleteOptions,
  ICioAutocomplete,
  Item,
  SectionOrder,
  AutocompleteResultSections,
} from '../types';
import usePrevious from './usePrevious';
import { getIndexOffset } from '../utils';

const defaultPlaceholder = 'What can we help you find today?';

type UseCioAutocomplete = (options: UseCioAutocompleteOptions) => ICioAutocomplete;

const useCioAutocomplete: UseCioAutocomplete = (options) => {
  const {
    resultsPerSection,
    onSubmit,
    openOnFocus,
    apiKey,
    cioJsClient,
    placeholder = defaultPlaceholder,
    sectionOrder = ['Search Suggestions', 'Products'],
    zeroStateSectionOrder,
    zeroStateSections,
  } = options;
  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions);
  const sections = useDebouncedFetchSection(query, cioClient, resultsPerSection);
  const items: Item[] = [];

  const zeroStateSectionsActive = !query.length && zeroStateSectionOrder && zeroStateSections;

  const activeSectionOrder : SectionOrder = zeroStateSectionsActive ? zeroStateSectionOrder : sectionOrder;
  const activeSections: AutocompleteResultSections = zeroStateSectionsActive ? zeroStateSections : sections;

  activeSectionOrder.forEach((sectionName) => {
    const sectionItems = activeSections[sectionName] || [];
    items.push(...sectionItems);
  });
  const downshift = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu } = downshift;

  return {
    query,
    sections,
    sectionOrder,
    isOpen,
    getMenuProps,
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: ({ item, index = 0, sectionName = 'products' }) => {
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
