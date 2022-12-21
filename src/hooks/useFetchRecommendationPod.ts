import { useEffect, useState } from 'react';
import { AutocompleteResultSections, RecommendationsSectionConfiguration, Item } from '../types';
import { CioClient } from './useCioClient';

const useFetchRecommendationPod = (
  cioClient: CioClient,
  recommendationPods: RecommendationsSectionConfiguration[]
) => {
  const [recommendationResults, setRecommendationResults] = useState<AutocompleteResultSections>(
    {}
  );

  useEffect(() => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(
        recommendationPods.map(({ identifier: podId, ...parameters }) =>
          cioClient.recommendations.getRecommendations(podId, parameters)
        )
      );
      const recommendationPodResults = {};

      responses.forEach(({ response }) => {
        const { pod, results } = response;
        recommendationPodResults[pod.id] = results.map((item: Item) => ({
          ...item,
          section: pod?.id
        }));
      });

      setRecommendationResults(recommendationPodResults);
    };
    fetchRecommendationResults();
  }, [cioClient]);

  return recommendationResults;
};

export default useFetchRecommendationPod;
