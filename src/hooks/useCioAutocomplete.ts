import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import { CioAutocompleteProps, CioClientConfig, UserDefinedSection } from '../types';
import usePrevious from './usePrevious';
import { getItemPosition } from '../utils';
import useConsoleErrors from './useConsoleErrors';
import useSections from './useSections';
import useItems from './useItems';

export const defaultSections: UserDefinedSection[] = [
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
  const {
    onSubmit,
    onChange,
    openOnFocus,
    apiKey,
    cioJsClient,
    placeholder = 'What can we help you find today?',
    sections = defaultSections,
    zeroStateSections,
    autocompleteClassName = 'cio-autocomplete',
    advancedParameters = {},
  } = options;

  const [query, setQuery] = useState('');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientConfig);

  // Get autocomplete sections (autocomplete + recommendations + custom)
  const { activeSections, activeSectionsWithData, zeroStateActiveSections } = useSections(
    query,
    cioClient,
    sections,
    zeroStateSections,
    advancedParameters
  );

  // Get dropdown items array from active sections (autocomplete + recommendations + custom)
  const items = useItems(activeSectionsWithData);

  // Downshift
  const downshift = useDownShift({ setQuery, onChange, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu, highlightedIndex } = downshift;

  // Log console errors
  useConsoleErrors(sections, activeSections);

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
      const { index, sectionId } = getItemPosition({ item, items });
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
        if (zeroStateActiveSections && openOnFocus !== false) {
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
