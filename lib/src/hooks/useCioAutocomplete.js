import { useState } from 'react';
import useCioClient from './useCioClient';
import useDownShift from './useDownShift';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import usePrevious from './usePrevious';
import { getIndexOffset } from '../utils';
export const defaultSections = [
  {
    identifier: 'Search Suggestions',
    type: 'autocomplete'
  },
  {
    identifier: 'Products',
    type: 'autocomplete'
  }
];
const useCioAutocomplete = (options) => {
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
  const cioClient = useCioClient({ apiKey, cioJsClient });
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
  const autocompleteSections =
    activeSections === null || activeSections === void 0
      ? void 0
      : activeSections.filter((config) => config.type === 'autocomplete' || !config.type);
  const recommendationsSections =
    activeSections === null || activeSections === void 0
      ? void 0
      : activeSections.filter((config) => config.type === 'recommendations');
  const autocompleteResults = useDebouncedFetchSection(query, cioClient, autocompleteSections);
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);
  const sectionResults = Object.assign(
    Object.assign({}, autocompleteResults),
    recommendationsResults
  );
  const activeSectionsWithData = [];
  activeSections === null || activeSections === void 0
    ? void 0
    : activeSections.forEach((config) => {
        const { identifier, data: customData } = config;
        const data = sectionResults[identifier] || customData;
        if (data && data !== undefined) {
          activeSectionsWithData.push(Object.assign(Object.assign({}, config), { data }));
        }
      });
  const items = [];
  activeSectionsWithData === null || activeSectionsWithData === void 0
    ? void 0
    : activeSectionsWithData.forEach((config) => {
        if (config === null || config === void 0 ? void 0 : config.data) {
          items.push(...config.data);
        }
      });
  const downshift = useDownShift({ setQuery, onChange, items, onSubmit, cioClient, previousQuery });
  const { isOpen, getMenuProps, getLabelProps, openMenu, closeMenu } = downshift;
  return {
    query,
    sections: activeSectionsWithData,
    isOpen,
    getMenuProps: () =>
      Object.assign(Object.assign({}, getMenuProps()), {
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
      return Object.assign(
        Object.assign({}, downshift.getItemProps({ item, index: index + indexOffset })),
        { className: 'cio-item', 'data-testid': `cio-item-${sectionIdentifier.replace(' ', '')}` }
      );
    },
    getInputProps: () =>
      Object.assign(Object.assign({}, downshift.getInputProps()), {
        value: query,
        onFocus: () => {
          var _a;
          if (options.onFocus) {
            options.onFocus();
          }
          if (zeroStateSectionsActive && openOnFocus !== false) {
            downshift.openMenu();
          }
          if (query === null || query === void 0 ? void 0 : query.length) {
            downshift.openMenu();
          }
          (_a = cioClient === null || cioClient === void 0 ? void 0 : cioClient.tracker) === null ||
          _a === void 0
            ? void 0
            : _a.trackInputFocus();
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
        cioClient === null || cioClient === void 0
          ? void 0
          : cioClient.tracker.trackSearchSubmit(query, { original_query: query });
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
//# sourceMappingURL=useCioAutocomplete.js.map
