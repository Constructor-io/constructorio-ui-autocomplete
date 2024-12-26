/* eslint-disable max-params */
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { useMemo } from 'react';
import {
  AdvancedParameters,
  AutocompleteSectionConfiguration,
  RecommendationsSectionConfiguration,
  UserDefinedSection,
} from '../../types';
import useDebouncedFetchSection from '../useDebouncedFetchSections';
import useFetchRecommendationPod from '../useFetchRecommendationPod';
import { isAutocompleteSection, isRecommendationsSection } from '../../typeGuards';

export default function useSectionsResults(
  query: string,
  cioClient: Nullable<ConstructorIO>,
  activeSections: UserDefinedSection[],
  advancedParameters?: AdvancedParameters
) {
  // Fetch Autocomplete Results
  const activeAutocompleteSections = useMemo(
    () =>
      activeSections?.filter((config: UserDefinedSection) =>
        isAutocompleteSection(config)
      ) as AutocompleteSectionConfiguration[],
    [activeSections]
  );

  const {
    sectionsData: autocompleteResults,
    request,
    totalNumResultsPerSection,
  } = useDebouncedFetchSection(query, cioClient, activeAutocompleteSections, advancedParameters);

  // Fetch Recommendations Results
  const activeRecommendationsSections = useMemo(
    () =>
      activeSections?.filter((config: UserDefinedSection) =>
        isRecommendationsSection(config)
      ) as RecommendationsSectionConfiguration[],
    [activeSections]
  );

  const { fetchRecommendationResults, recommendationsResults, podsData } =
    useFetchRecommendationPod(
      cioClient,
      activeRecommendationsSections,
      advancedParameters?.fetchZeroStateOnFocus
    );

  return {
    recommendations: {
      results: recommendationsResults,
      fetchRecommendationResults,
      podsData,
    },
    autocomplete: {
      results: autocompleteResults,
      request,
      totalNumResultsPerSection,
    },
  };
}
