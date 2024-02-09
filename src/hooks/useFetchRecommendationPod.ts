import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { Item, SectionsData, RecommendationsSectionConfiguration, PodData } from '../types';

const useFetchRecommendationPod = (
  cioClient: Nullable<ConstructorIOClient>,
  recommendationPods: RecommendationsSectionConfiguration[]
) => {
  const [recommendationsResults, setRecommendationsResults] = useState<SectionsData>({});
  const [podsData, setPodsData] = useState<Record<string, PodData>>({});

  useEffect(() => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;
    const fetchRecommendationResults = async () => {
      const responses = await Promise.all(
        recommendationPods.map(({ podId, indexSectionName, ...parameters }) =>
          cioClient.recommendations.getRecommendations(podId, {
            ...parameters,
            section: indexSectionName,
          })
        )
      );
      const recommendationsPodResults = {};
      const recommendationsPodsData = {};
      responses.forEach(({ response, request }, index) => {
        const { pod, results } = response;
        if (pod?.id) {
          recommendationsPodResults[pod.id] = results?.map((item: Item) => ({
            ...item,
            id: item?.data?.id,
            section: recommendationPods[index]?.indexSectionName,
            podId: pod.id,
          }));
          recommendationsPodsData[pod.id] = {
            displayName: pod.display_name,
            podId: pod.id,
            request,
          };
        }
      });

      try {
        setRecommendationsResults(recommendationsPodResults);
        setPodsData(recommendationsPodsData);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchRecommendationResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cioClient]);

  return { recommendationsResults, podsData };
};

export default useFetchRecommendationPod;
