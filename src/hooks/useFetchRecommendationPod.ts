import { useEffect, useState } from 'react';
import { CioClient, AutocompleteResultSections, SectionConfiguration } from '../types';

const useFetchRecommendationPod = (cioClient: CioClient | null | undefined, recommendationPods: SectionConfiguration[]) => {
  const [recommendationResults, setRecommendationResults] = useState<AutocompleteResultSections>({});

  useEffect(() => {
    if (!cioClient) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(recommendationPods.map(({ identifier: podId, additionalParameters: parameters }) => (
        cioClient?.recommendations.getRecommendations(podId, parameters)
      )));
      const recommendationPodResults = {};

      responses.forEach(({ response }) => {
        const { pod, results } = response;
        recommendationPodResults[pod.id] = results;
      })

      setRecommendationResults(recommendationPodResults);
    }
    fetchRecommendationResults();
  }, [cioClient]);

  return recommendationResults;
}

export default useFetchRecommendationPod;
