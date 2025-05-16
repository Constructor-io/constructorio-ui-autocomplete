/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { UseCioAutocompleteOptions, UserDefinedSection } from '../types';
import { isAutocompleteSection, isRecommendationsSection } from '../typeGuards';

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

const convertLegacyParametersAndAddDefaults = (sections: UserDefinedSection[]) =>
  sections.map((config) => {
    if (isRecommendationsSection(config)) {
      if (config.identifier && !config.podId) {
        return { ...config, podId: config.identifier };
      }

      if (!config.indexSectionName) {
        return { ...config, indexSectionName: 'Products' };
      }
    }

    if (isAutocompleteSection(config)) {
      if (config.identifier && !config.indexSectionName) {
        return { ...config, indexSectionName: config.identifier };
      }
    }

    return config;
  });

const normalizeSections = (sections: UserDefinedSection[] | undefined) => {
  if (sections) {
    return convertLegacyParametersAndAddDefaults(sections);
  }

  return sections;
};

// Normalize and Memoize Objects to prevent infinite rerenders if users pass object literals to useCioAutocomplete
const useNormalizedProps = (options: UseCioAutocompleteOptions) => {
  const {
    sections = defaultSections,
    zeroStateSections,
    cioJsClientOptions,
    advancedParameters,
  } = options;

  const sectionsMemoized = useMemo(
    () => normalizeSections(sections),
    [JSON.stringify(sections)]
  ) as UserDefinedSection[];

  const zeroStateSectionsMemoized = useMemo(
    () => normalizeSections(zeroStateSections),
    [JSON.stringify(zeroStateSections)]
  );

  const cioJsClientOptionsMemoized = useMemo(
    () => cioJsClientOptions,
    [JSON.stringify(cioJsClientOptions)]
  );

  const advancedParametersMemoized = useMemo(
    () => advancedParameters,
    [JSON.stringify(advancedParameters)]
  );

  return {
    sections: sectionsMemoized,
    zeroStateSections: zeroStateSectionsMemoized,
    cioJsClientOptions: cioJsClientOptionsMemoized,
    advancedParameters: advancedParametersMemoized,
  };
};

export default useNormalizedProps;
