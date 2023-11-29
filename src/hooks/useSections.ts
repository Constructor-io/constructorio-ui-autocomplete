/* eslint-disable max-params */
import { RefObject, createRef, useEffect, useMemo, useRef, useState } from 'react';
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { AdvancedParameters, RecommendationsSection, Section, UserDefinedSection } from '../types';
import { getActiveSectionsWithData } from '../utils';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import useFetchRecommendationPod from './useFetchRecommendationPod';

export default function useSections(
  query: string,
  cioClient: Nullable<ConstructorIO>,
  sections: UserDefinedSection[],
  zeroStateSections: UserDefinedSection[] | undefined,
  advancedParameters?: AdvancedParameters
) {
  const zeroStateActiveSections = !query.length && zeroStateSections;

  // Define All Sections
  const [activeSections, setActiveSections] = useState<UserDefinedSection[]>(
    zeroStateActiveSections ? zeroStateSections : sections
  );

  useEffect(() => {
    setActiveSections(zeroStateActiveSections ? zeroStateSections : sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zeroStateActiveSections]);

  const sectionsRefs = useRef<RefObject<HTMLLIElement>[]>(activeSections.map(() => createRef()));
  const [activeSectionsWithData, setActiveSectionsWithData] = useState<Section[]>([]);
  const autocompleteSections = useMemo(
    () =>
      activeSections?.filter(
        (config: UserDefinedSection) => config.type === 'autocomplete' || !config.type
      ),
    [activeSections]
  );
  const recommendationsSections = useMemo(
    () =>
      activeSections?.filter(
        (config: UserDefinedSection) => config.type === 'recommendations'
      ) as RecommendationsSection[],
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

  // Reset sections
  useEffect(() => {
    if (
      (sections && !Array.isArray(sections)) ||
      (zeroStateSections && !Array.isArray(zeroStateSections))
    ) {
      setActiveSections([]);
    }
  }, [sections, zeroStateSections]);

  return {
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections,
    request,
  };
}
