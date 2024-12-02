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

  // Get Active Sections defined by configs
  const { activeSections, showZeroStateSections, setActiveSections } = useActiveSections(
    query,
    sections,
    podsData,
    zeroStateSections
  );

  // Sections Refs
  const sectionsRefs = useRef<RefObject<HTMLLIElement>[]>(activeSections.map(() => createRef()));

  // Sections API results
  const { recommendations, autocomplete } = useSectionsResults(
    query,
    cioClient,
    activeSections,
    advancedParameters
  );

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

  const sectionsResults = useMemo(
    () => ({ ...autocomplete.results, ...recommendations.results }),
    [autocomplete.results, recommendations.results]
  );

  const activeSectionsWithData = useActiveSectionsWithData(
    sectionsResults,
    activeSections,
    sectionsRefs
  );

  return {
    fetchRecommendationResults: recommendations.fetchRecommendationResults,
    activeSections,
    activeSectionsWithData,
    zeroStateActiveSections: showZeroStateSections,
    request: autocomplete.request,
    totalNumResultsPerSection: autocomplete.request,
  };
}
