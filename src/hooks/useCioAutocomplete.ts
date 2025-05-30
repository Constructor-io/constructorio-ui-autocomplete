'use client';

import { useMemo, useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import {
  CioClientConfig,
  Section,
  UserDefinedSection,
  HTMLPropsWithCioDataAttributes,
  Item,
  UseCioAutocompleteOptions,
} from '../types';
import usePrevious from './usePrevious';
import { getItemPosition, getItemsForActiveSections } from '../utils/helpers';
import { toKebabCase } from '../utils/format';
import { trackRecommendationView, trackSearchSubmit } from '../utils/tracking';
import { getFeatures } from '../utils/features';
import useConsoleErrors from './useConsoleErrors';
import useSections from './useSections';
import useRecommendationsObserver from './useRecommendationsObserver';
import { isCustomSection, isRecommendationsSection } from '../typeGuards';
import useNormalizedProps from './useNormalizedProps';
import useCustomBlur from './useCustomBlur';

export const defaultSections: UserDefinedSection[] = [
  {
    indexSectionName: 'Search Suggestions',
    type: 'autocomplete',
  },
  {
    indexSectionName: 'Products',
    type: 'autocomplete',
  },
];

const useCioAutocomplete = (options: UseCioAutocompleteOptions) => {
  const { sections, zeroStateSections, cioJsClientOptions, advancedParameters } =
    useNormalizedProps(options);
  const {
    onSubmit,
    onChange,
    openOnFocus,
    apiKey,
    cioJsClient,
    placeholder = 'What can we help you find today?',
    autocompleteClassName = 'cio-autocomplete',
    defaultInput,
    getSearchResultsUrl,
    ...rest
  } = options;

  const [query, setQuery] = useState(defaultInput || '');
  const previousQuery = usePrevious(query);
  const cioClient = useCioClient({ apiKey, cioJsClient, cioJsClientOptions } as CioClientConfig);

  // Get autocomplete sections (autocomplete + recommendations + custom)
  const {
    fetchRecommendationResults,
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections,
    request,
    totalNumResultsPerSection,
  } = useSections(query, cioClient, sections, zeroStateSections, advancedParameters);

  const features = useMemo(() => getFeatures(request), [request]);

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
    getItemProps: getItemPropsDownShift,
  } = useDownShift({
    setQuery,
    items,
    onSubmit,
    cioClient,
    previousQuery,
    ...rest,
  });

  useCustomBlur(isOpen, closeMenu, autocompleteClassName);

  // Log console errors
  useConsoleErrors(sections, activeSections);

  // Track recommendation view
  useRecommendationsObserver(isOpen, activeSectionsWithData, cioClient, trackRecommendationView);

  return {
    query,
    sections: activeSectionsWithData,
    totalNumResultsPerSection,
    request,
    featureToggles: features,
    isOpen,
    getMenuProps: () => ({
      ...getMenuProps(),
      className: 'cio-results',
      'data-testid': 'cio-results',
      'data-cnstrc-autosuggest': '',
    }),
    getLabelProps,
    openMenu,
    closeMenu,
    getItemProps: (item: Item) => {
      const { index, sectionId } = getItemPosition({ item, items });
      const sectionItemTestId = `cio-item-${sectionId?.replace(' ', '')}`;

      return {
        ...getItemPropsDownShift({ item, index }),
        // @deprecated `sectionItemTestId` will be removed as a className in the next major version
        className: `cio-item ${sectionItemTestId}`,
        'data-testid': sectionItemTestId,
        'data-cnstrc-item-section': item.section,
        'data-cnstrc-item-group': item.groupId,
        'data-cnstrc-item-name': item.value,
        'data-cnstrc-item-id': item.data?.id,
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
        if (
          zeroStateActiveSections &&
          openOnFocus !== false &&
          features.featureDisplayZeroStateRecommendations
        ) {
          openMenu();
        }
        if (query?.length) {
          openMenu();
        }
        try {
          if (advancedParameters?.fetchZeroStateOnFocus) {
            fetchRecommendationResults();
          }
          cioClient?.tracker?.trackInputFocus();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      },
      className: 'cio-input',
      'data-testid': 'cio-input',
      'data-cnstrc-search-input': '',
      placeholder,
      onKeyDownCapture: ({ code, key, nativeEvent }) => {
        const isEnter = code === 'Enter' || key === 'Enter';
        const isHome = code === 'Home' || key === 'Home';
        const isEnd = code === 'End' || key === 'End';

        const isUserInput = highlightedIndex < 0;
        if (isOpen && isEnter && isUserInput && query?.length) {
          if (onSubmit) {
            onSubmit({ query });
          }
          try {
            trackSearchSubmit(cioClient, query, { originalQuery: query });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }

        if (isHome || isEnd) {
          // eslint-disable-next-line no-param-reassign
          nativeEvent.preventDownshiftDefault = true;
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
          trackSearchSubmit(cioClient, query, { originalQuery: query });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
        return { query };
      },
      className: 'cio-form',
      'data-testid': 'cio-form',
      'data-cnstrc-search-form': '',
    }),
    getSectionProps: (section: Section) => {
      // @deprecated ClassNames derived from this fn will be removed in the next major version
      const getDeprecatedClassNames = () => {
        const { type } = section;
        let sectionTitle: string;

        const indexSectionName =
          type !== 'custom' && section.indexSectionName
            ? toKebabCase(section.indexSectionName)
            : '';

        switch (type) {
          case 'recommendations':
            sectionTitle = section.podId;
            break;
          case 'autocomplete':
            sectionTitle = section.displayName || section.indexSectionName;
            break;
          case 'custom':
            sectionTitle = section.displayName;
            break;
          default:
            sectionTitle = section.displayName || section.indexSectionName;
            break;
        }

        return `${sectionTitle} ${indexSectionName}`;
      };

      // Always add the indexSectionName (defaults to Products) as a class to the section container for the styles
      // Even if the section is a recommendation pod, if the results are "Products" or "Search Suggestions"
      // ... they should be styled accordingly
      const sectionListingType = isCustomSection(section)
        ? 'custom'
        : toKebabCase(section.indexSectionName || section.data[0]?.section || 'Products');

      const attributes: HTMLPropsWithCioDataAttributes = {
        className: `cio-section cio-section-${sectionListingType} ${getDeprecatedClassNames()}`,
        ref: section.ref,
        role: 'none',
        'data-cnstrc-section': section.data[0]?.section,
      };

      if (isCustomSection(section)) {
        attributes['data-cnstrc-custom-section'] = true;
        attributes['data-cnstrc-custom-section-name'] = section.displayName;
      }

      // Add data attributes for recommendations
      if (isRecommendationsSection(section)) {
        attributes['data-cnstrc-recommendations'] = true;
        attributes['data-cnstrc-recommendations-pod-id'] = section.podId;
      }
      return attributes;
    },
    setQuery,
    cioClient,
    autocompleteClassName,
    selectedItem: items[highlightedIndex],
    advancedParameters,
    getSearchResultsUrl,
  };
};

export default useCioAutocomplete;
