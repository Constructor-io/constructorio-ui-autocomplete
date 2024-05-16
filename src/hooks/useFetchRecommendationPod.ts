import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { SectionsData, RecommendationsSectionConfiguration, PodData } from '../types';
import { fetchRecommendationResults } from '../utils';

const useFetchRecommendationPod = (
  cioClient: Nullable<ConstructorIOClient>,
  recommendationPods: RecommendationsSectionConfiguration[],
  fetchZeroStateOnFocus: boolean = false
) => {
  const [recommendationsResults, setRecommendationsResults] = useState<SectionsData>({});
  const [podsData, setPodsData] = useState<Record<string, PodData>>({});

  useEffect(() => {
    if (fetchZeroStateOnFocus) return;
    fetchRecommendationResults(
      cioClient,
      recommendationPods,
      setRecommendationsResults,
      setPodsData
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cioClient]);

  return { recommendationsResults, podsData };
};

export default useFetchRecommendationPod;
