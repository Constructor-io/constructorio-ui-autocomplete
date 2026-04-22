import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { SectionsData, RecommendationsSectionConfiguration, PodData } from '../types';
import { getRecommendationPodKey } from '../utils/helpers';
import { DEFAULT_RECOMMENDATION_INDEX_SECTION } from '../constants';

const useFetchRecommendationPod = (
  cioClient: Nullable<ConstructorIOClient>,
  recommendationPods: RecommendationsSectionConfiguration[],
  fetchZeroStateOnFocus: boolean = false
) => {
  const [recommendationsResults, setRecommendationsResults] = useState<SectionsData>({});
  const [podsData, setPodsData] = useState<Record<string, PodData>>({});

  const fetchRecommendationResults = async () => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;

    const responses = await Promise.all(
      recommendationPods.map(({ podId, indexSectionName, ...parameters }) =>
        cioClient.recommendations.getRecommendations(podId, {
          ...parameters,
          section: indexSectionName ?? DEFAULT_RECOMMENDATION_INDEX_SECTION,
        })
      )
    );
    const recommendationsPodResults = {};
    const recommendationsPodsData = {};
    responses.forEach(({ response, request, result_id: resultId }, index) => {
      const { pod, results } = response;
      if (pod?.id) {
        const sectionName =
          recommendationPods[index]?.indexSectionName ?? DEFAULT_RECOMMENDATION_INDEX_SECTION;
        const podKey = getRecommendationPodKey(pod.id, sectionName);
        recommendationsPodResults[podKey] = results?.map((item) => ({
          ...item,
          id: item?.data?.id,
          section: sectionName,
          podId: pod.id,
        }));
        recommendationsPodsData[podKey] = {
          displayName: pod.display_name,
          podId: pod.id,
          request,
          resultId,
          numResults: response.total_num_results ?? 0,
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

  useEffect(() => {
    if (fetchZeroStateOnFocus) return;
    fetchRecommendationResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cioClient, recommendationPods]);

  return { fetchRecommendationResults, recommendationsResults, podsData };
};

export default useFetchRecommendationPod;
