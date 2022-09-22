import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import { CioClientOptions, UseCioAutocompleteOptions, ICioAutocomplete, Item } from '../types';
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
    sectionOrder = ['searchSuggestions', 'products'],
  } = options;
  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions); 
  const sections = useDebouncedFetchSection(query, cioClient, resultsPerSection);
  const items: Item[] = []; 
  sectionOrder.forEach((sectionName) => {
    items.push(...(sections[sectionName] || []));
  });
  const downshift = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu } = downshift;

  return {
    query,
    sections,
    sectionOrder,
    isOpen,
    getMenuProps,
    getLabelProps,
    openMenu,
    getItemProps: ({ item, index = 0, sectionName = 'products', indexOffset = getIndexOffset({ sections, sectionOrder, sectionName }) }) => {
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
  };
};

export default useCioAutocomplete;
