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
} from '../utils';
import useConsoleErrors from './useConsoleErrors';
import useSections from './useSections';
import useRecommendationsObserver from './useRecommendationsObserver';

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
    cioJsClientOptions,
    placeholder = 'What can we help you find today?',
    sections = defaultSections,
    zeroStateSections,
    autocompleteClassName = 'cio-autocomplete',
    advancedParameters,
  } = options;

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
      const sectionName = section?.displayName || section?.identifier;
      const attributes: HTMLPropsWithCioDataAttributes = {
        className: `${sectionName} cio-section`,
        ref: section.ref,
        role: 'none',
        'data-cnstrc-section': section.data[0]?.section,
      };

      // Add data attributes for recommendations
      if (section.type === 'recommendations') {
        attributes['data-cnstrc-recommendations'] = true;
        attributes['data-cnstrc-recommendations-pod-id'] = section.identifier;
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
