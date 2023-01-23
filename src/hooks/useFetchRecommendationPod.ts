import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { AutocompleteResultSections, RecommendationsSectionConfiguration, Item } from '../types';

const useFetchRecommendationPod = (
  cioClient: ConstructorIOClient | undefined,
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
        if (pod?.id) {
          recommendationPodResults[pod.id] = results?.map((item: Item) => ({
            ...item,
            section: pod.id
          }));
        }
      });

      setRecommendationResults(recommendationPodResults);
    };
    fetchRecommendationResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cioClient]);

  return recommendationResults;
};

export default useFetchRecommendationPod;
