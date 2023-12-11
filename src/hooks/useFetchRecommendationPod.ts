import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { Item, SectionsData, RecommendationsSectionConfiguration } from '../types';

const useFetchRecommendationPod = (
  cioClient: Nullable<ConstructorIOClient>,
  recommendationPods: RecommendationsSectionConfiguration[]
) => {
  const [recommendationResults, setRecommendationResults] = useState<SectionsData>({});

  useEffect(() => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(
        recommendationPods.map(({ podId, indexSection, ...parameters }) =>
          cioClient.recommendations.getRecommendations(podId, {
            ...parameters,
            section: indexSection,
          })
        )
      );
      const recommendationPodResults = {};

      responses.forEach(({ response }, index) => {
        const { pod, results } = response;
        if (pod?.id) {
          recommendationPodResults[pod.id] = results?.map((item: Item) => ({
            ...item,
            id: item?.data?.id,
            section: recommendationPods[index]?.indexSection,
            podId: pod.id,
          }));
        }
      });

      try {
        setRecommendationResults(recommendationPodResults);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchRecommendationResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cioClient]);

  return recommendationResults;
};

export default useFetchRecommendationPod;
