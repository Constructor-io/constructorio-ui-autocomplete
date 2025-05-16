import { useMemo, useState } from 'react';
import { PodData, UserDefinedSection } from '../../types';
import { isRecommendationsSection } from '../../typeGuards';

export default function useActiveSections(
  query: string,
  sections: UserDefinedSection[],
  podsData?: Record<string, PodData>,
  zeroStateSections?: UserDefinedSection[]
) {
  const showZeroStateSections = !query.length && !!zeroStateSections?.length;

  const [activeSections, setActiveSections] = useState<UserDefinedSection[]>(
    showZeroStateSections ? zeroStateSections : sections
  );

  // Merge Recommendation Pods Display Name from Dashboard
  const activeSectionsTransformed = useMemo(
    () =>
      activeSections.map((config: UserDefinedSection) => {
        const mergedConfig = config;

        if (isRecommendationsSection(config)) {
          const podData = podsData?.[config.podId];
          const libraryDisplayName = config.displayName;
          const dashboardDisplayName = podData?.displayName;

          mergedConfig.displayName = libraryDisplayName || dashboardDisplayName;
        }

        return mergedConfig;
      }),
    [activeSections, podsData]
  );

  return {
    activeSections: activeSectionsTransformed,
    showZeroStateSections,
    setActiveSections,
  };
}
