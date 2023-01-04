import { AutocompleteResultSections, RecommendationsSectionConfiguration } from '../types';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
declare const useFetchRecommendationPod: (
  cioClient: ConstructorIOClient | undefined,
  recommendationPods: RecommendationsSectionConfiguration[]
) => AutocompleteResultSections;
export default useFetchRecommendationPod;
