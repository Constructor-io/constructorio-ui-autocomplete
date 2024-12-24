/* eslint-disable max-params */
import { RefObject, createRef, useEffect, useMemo, useRef, useState } from 'react';
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { AdvancedParameters, PodData, UserDefinedSection } from '../../types';
import useActiveSections from './useActiveSections';
import useSectionsResults from './useSectionsResults';
import useActiveSectionsWithData from './useActiveSectionsWithData';
import useRemoveSections from './useRemoveSections';

export default function useSections(
  query: string,
  cioClient: Nullable<ConstructorIO>,
  sections: UserDefinedSection[],
  zeroStateSections?: UserDefinedSection[],
  advancedParameters?: AdvancedParameters
) {
  const [podsData, setPodsData] = useState<Record<string, PodData>>({});

  // Get Active Sections defined by configuration object
  const { activeSections, showZeroStateSections, setActiveSections } = useActiveSections(
    query,
    sections,
    podsData,
    zeroStateSections
  );

  // create refs for active sections
  const sectionsRefs = useRef<RefObject<HTMLLIElement>[]>(activeSections.map(() => createRef()));

  // Get API results for each active section
  const { recommendations, autocomplete } = useSectionsResults(
    query,
    cioClient,
    activeSections,
    advancedParameters
  );

  // Access the Pods Data from the Recommendations response to update Active Sections configuration
  useEffect(() => {
    if (!recommendations.podsData) {
      setPodsData(recommendations.podsData);
    }
  }, [recommendations.podsData]);

  useRemoveSections(
    sections,
    podsData,
    setActiveSections,
    showZeroStateSections,
    zeroStateSections
  );

  // Combine recommendations and autocomplete results in sectionsResults
  const sectionsResults = useMemo(
    () => ({ ...autocomplete.results, ...recommendations.results }),
    [autocomplete.results, recommendations.results]
  );

  // Return current active sections populated with data from the API response sectionsResults
  const activeSectionsWithData = useActiveSectionsWithData(
    sectionsResults,
    activeSections,
    sectionsRefs,
    query
  );

  return {
    fetchRecommendationResults: recommendations.fetchRecommendationResults,
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections: showZeroStateSections,
    request: autocomplete.request,
    totalNumResultsPerSection: autocomplete.totalNumResultsPerSection,
  };
}
