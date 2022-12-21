import { useEffect, useState } from 'react';
import { AutocompleteResultSections, SectionConfiguration, Item } from '../types';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

const useFetchRecommendationPod = (
  cioClient: ConstructorIOClient | undefined,
  recommendationPods: SectionConfiguration[]
) => {
  const [recommendationResults, setRecommendationResults] = useState<AutocompleteResultSections>(
    {}
  );

  useEffect(() => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(
        recommendationPods.map(({ identifier: podId, parameters }) =>
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
  }, [cioClient]);

  return recommendationResults;
};

export default useFetchRecommendationPod;
