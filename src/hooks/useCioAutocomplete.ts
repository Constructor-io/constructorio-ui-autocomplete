import { useMemo, useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import { CioAutocompleteProps, CioClientConfig, UserDefinedSection } from '../types';
import usePrevious from './usePrevious';
import { getItemPosition, getSearchSuggestionFeatures } from '../utils';
import useConsoleErrors from './useConsoleErrors';
import useSections from './useSections';
import useItems from './useItems';

export const defaultSections: UserDefinedSection[] = [
  {
    indexSection: 'Search Suggestions',
    type: 'autocomplete',
  },
  {
    indexSection: 'Products',
    type: 'autocomplete',
  },
];

export type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;

const convertLegacy = (sections: UserDefinedSection[]) =>
  sections.map((config) => {
    const { type } = config;

    if (type === 'recommendations') {
      if (config.identifier && !config.podId) {
        return { ...config, podId: config.identifier };
      }
    }

    if (type === 'autocomplete' || !type) {
      if (config.identifier && !config.indexSection) {
        return { ...config, indexSection: config.identifier };
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
  } = options;

  let { sections = defaultSections, zeroStateSections } = options;

  sections = useMemo(() => {
    if (sections) {
      return convertLegacy(sections);
    }

    return sections;
  }, [sections]);

  zeroStateSections = useMemo(() => {
    if (zeroStateSections) {
      return convertLegacy(zeroStateSections);
    }

    return zeroStateSections;
  }, [zeroStateSections]);

  const [query, setQuery] = useState('');
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
  const items = useItems(activeSectionsWithData);

  const downshift = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu, highlightedIndex } = downshift;

  // Log console errors
  useConsoleErrors(sections, activeSections);

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
        ...downshift.getItemProps({ item, index }),
        className: `cio-item ${sectionItemTestId}`,
        'data-testid': sectionItemTestId,
      };
    },
    getInputProps: () => ({
      ...downshift.getInputProps({
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
          downshift.openMenu();
        }
        if (query?.length) {
          downshift.openMenu();
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
    setQuery,
    cioClient,
    autocompleteClassName,
    selectedItem: items[highlightedIndex],
    advancedParameters,
  };
};

export default useCioAutocomplete;
