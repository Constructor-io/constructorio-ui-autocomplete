import { __awaiter, __rest } from 'tslib';
import { useEffect, useState } from 'react';
const useFetchRecommendationPod = (cioClient, recommendationPods) => {
  const [recommendationResults, setRecommendationResults] = useState({});
  useEffect(() => {
    if (!cioClient || !Array.isArray(recommendationPods) || recommendationPods.length === 0) return;
    const fetchRecommendationResults = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const responses = yield Promise.all(
          recommendationPods.map((_a) => {
            var { identifier: podId } = _a,
              parameters = __rest(_a, ['identifier']);
            return cioClient.recommendations.getRecommendations(podId, parameters);
          })
        );
        const recommendationPodResults = {};
        responses.forEach(({ response }) => {
          const { pod, results } = response;
          if (pod === null || pod === void 0 ? void 0 : pod.id) {
            recommendationPodResults[pod.id] =
              results === null || results === void 0
                ? void 0
                : results.map((item) =>
                    Object.assign(Object.assign({}, item), { section: pod.id })
                  );
          }
        });
        setRecommendationResults(recommendationPodResults);
      });
    fetchRecommendationResults();
  }, [cioClient]);
  return recommendationResults;
};
export default useFetchRecommendationPod;
//# sourceMappingURL=useFetchRecommendationPod.js.map
