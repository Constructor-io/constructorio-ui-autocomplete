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
import { getActiveSectionsWithData } from '../utils';
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
  const zeroStateActiveSections = !query.length && zeroStateSections;

  // Define All Sections
  const activeSections = zeroStateActiveSections ? zeroStateSections : sections;
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
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);

  // Add to active sections the results data and refs when autocomplete results or recommendation results fetched
  useEffect(() => {
    const sectionsResults = { ...autocompleteResults, ...recommendationsResults };
    setActiveSectionsWithData(
      getActiveSectionsWithData(activeSections, sectionsResults, sectionsRefs)
    );
  }, [autocompleteResults, recommendationsResults, activeSections]);

  return {
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections,
    request,
  };
}
