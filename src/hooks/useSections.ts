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
  const activeSections = zeroStateActiveSections ? zeroStateSections : sections;

  const autocompleteSections = activeSections?.filter(
    (config: UserDefinedSection) => config.type === 'autocomplete' || !config.type
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

  return {
    activeSections,
    activeSectionsWithData: getActiveSectionsWithData(activeSections, sectionResults),
    zeroStateActiveSections,
  };
}
