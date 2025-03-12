/* eslint-disable max-params */
import { useEffect } from 'react';
import { PodData, UserDefinedSection } from '../../types';
import { getFeatures } from '../../utils/features';

export default function useRemoveSections(
  sections: UserDefinedSection[],
  podsData: Record<string, PodData>,
  setActiveSections: any,
  showZeroStateSections: boolean,
  zeroStateSections?: UserDefinedSection[]
) {
  // Remove sections if necessary
  useEffect(() => {
    const features = getFeatures(Object.values(podsData || {})?.[0]?.request);

    if (showZeroStateSections) {
      if (!features.featureDisplayZeroStateRecommendations) {
        setActiveSections([]);
      } else {
        setActiveSections(zeroStateSections);
      }
    } else {
      setActiveSections(sections);
    }
  }, [zeroStateSections, showZeroStateSections, sections, podsData, setActiveSections]);
}
