import { useEffect, useMemo, useState } from 'react';
/* eslint-disable max-params */
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types/types';
import { AdvancedParameters, RecommendationsSection, UserDefinedSection } from '../types';
import { getActiveSectionsWithData } from '../utils';
import useDebouncedFetchSection from './useDebouncedFetchSections';
import useFetchRecommendationPod from './useFetchRecommendationPod';

export default function useSections(
  query: string,
  cioClient: Nullable<ConstructorIO>,
  sections: UserDefinedSection[],
  zeroStateSections: UserDefinedSection[] | undefined,
  advancedParameters: AdvancedParameters
) {
  const zeroStateActiveSections = !query.length && zeroStateSections;
  const [activeSections, setActiveSections] = useState(
    zeroStateActiveSections ? zeroStateSections : sections
  );

  const autocompleteSections = useMemo(
    () =>
      activeSections?.filter(
        (config: UserDefinedSection) => config.type === 'autocomplete' || !config.type
      ),
    [activeSections]
  );
  const recommendationsSections = activeSections?.filter(
    (config: UserDefinedSection) => config.type === 'recommendations'
  ) as RecommendationsSection[];

  // Fetch Autocomplete Results
  const autocompleteResults = useDebouncedFetchSection(
    query,
    cioClient,
    autocompleteSections,
    advancedParameters
  );

  // Fetch Recommendations Results
  const recommendationsResults = useFetchRecommendationPod(cioClient, recommendationsSections);

  const sectionResults = { ...autocompleteResults, ...recommendationsResults };

  const activeSectionsWithData = getActiveSectionsWithData(activeSections, sectionResults);

  useEffect(() => {
    setActiveSections(zeroStateActiveSections ? zeroStateSections : sections);
  }, [query, sections, zeroStateSections, zeroStateActiveSections]);

  useEffect(() => {
    if (sections && !Array.isArray(sections)) {
      setActiveSections([]);
    }
    if (zeroStateSections && !Array.isArray(zeroStateSections)) {
      setActiveSections([]);
    }
  }, [sections, zeroStateSections]);

  return {
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections,
  };
}
