/* eslint-disable max-params */
import { RefObject, createRef, useEffect, useMemo, useRef, useState } from 'react';
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import {
  AdvancedParameters,
  AutocompleteSectionConfiguration,
  RecommendationsSectionConfiguration,
  UserDefinedSection,
  Section,
} from '../types';
import { getActiveSectionsWithData, getFeatures } from '../utils';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import useFetchRecommendationPod from './useFetchRecommendationPod';
import { isAutocompleteSection, isRecommendationsSection } from '../typeGuards';

export default function useSections(
  query: string,
  cioClient: Nullable<ConstructorIO>,
  sections: UserDefinedSection[],
  zeroStateSections: UserDefinedSection[] | undefined,
  advancedParameters?: AdvancedParameters
) {
  const zeroStateActiveSections = !query.length && zeroStateSections?.length;

  // Define All Sections
  const [activeSections, setActiveSections] = useState<UserDefinedSection[]>(
    zeroStateActiveSections ? zeroStateSections : sections
  );
  const sectionsRefs = useRef<RefObject<HTMLLIElement>[]>(activeSections.map(() => createRef()));
  const [activeSectionsWithData, setActiveSectionsWithData] = useState<Section[]>([]);

  const autocompleteSections = useMemo(
    () =>
      activeSections?.filter((config: UserDefinedSection) =>
        isAutocompleteSection(config)
      ) as AutocompleteSectionConfiguration[],
    [activeSections]
  );
  const recommendationsSections = useMemo(
    () =>
      activeSections?.filter((config: UserDefinedSection) =>
        isRecommendationsSection(config)
      ) as RecommendationsSectionConfiguration[],
    [activeSections]
  );

  // Fetch Autocomplete Results
  const { sectionsData: autocompleteResults, request } = useDebouncedFetchSection(
    query,
    cioClient,
    autocompleteSections,
    advancedParameters
  );

  // Fetch Recommendations Results
  const { fetchRecommendationResults, recommendationsResults, podsData } =
    useFetchRecommendationPod(
      cioClient,
      recommendationsSections,
      advancedParameters?.fetchZeroStateOnFocus
    );

  // Remove sections if necessary
  useEffect(() => {
    const features = getFeatures(Object.values(podsData || {})?.[0]?.request);

    if (zeroStateActiveSections) {
      if (!features.featureDisplayZeroStateRecommendations) {
        setActiveSections([]);
      } else {
        setActiveSections(zeroStateSections);
      }
    } else {
      setActiveSections(sections);
    }
  }, [zeroStateSections, zeroStateActiveSections, sections, podsData]);

  // Merge Recommendation Pods Display Name from Dashboard
  const activeSectionConfigs = useMemo(
    () =>
      activeSections.map((config: UserDefinedSection) => {
        const mergedConfig = config;

        if (isRecommendationsSection(config)) {
          const podData = podsData[config.podId];
          const libraryDisplayName = config.displayName;
          const dashboardDisplayName = podData?.displayName;

          mergedConfig.displayName = libraryDisplayName || dashboardDisplayName;
        }

        return mergedConfig;
      }),
    [activeSections, podsData]
  );

  // Add to active sections the results data and refs when autocomplete results or recommendation results fetched
  useEffect(() => {
    const sectionsResults = { ...autocompleteResults, ...recommendationsResults };
    setActiveSectionsWithData(
      getActiveSectionsWithData(activeSectionConfigs, sectionsResults, sectionsRefs)
    );
  }, [autocompleteResults, recommendationsResults, activeSectionConfigs, podsData]);

  return {
    fetchRecommendationResults,
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections,
    request,
  };
}
