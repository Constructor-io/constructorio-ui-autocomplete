import { useEffect, useState } from 'react';
import { AutocompleteResultSections, SectionConfiguration, Item } from '../types';
import { CioClient } from './useCioClient';

const useFetchRecommendationPod = (
  cioClient: CioClient,
  recommendationPods: SectionConfiguration[]
) => {
  const [recommendationResults, setRecommendationResults] = useState<AutocompleteResultSections>(
    {}
  );

  useEffect(() => {
    if (!cioClient || recommendationPods?.length === 0) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(
        recommendationPods?.map(({ identifier: podId, parameters }) =>
          cioClient?.recommendations.getRecommendations(podId, parameters)
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
