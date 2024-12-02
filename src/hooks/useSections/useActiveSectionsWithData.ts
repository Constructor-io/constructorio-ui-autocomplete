import { RefObject, useEffect, useState } from 'react';
import { UserDefinedSection, Section, SectionsData } from '../../types';
import { getActiveSectionsWithData } from '../../utils';

export default function useActiveSectionsWithData(
  sectionsResults: SectionsData,
  activeSections: UserDefinedSection[],
  sectionsRefs: React.MutableRefObject<RefObject<HTMLLIElement>[]>,
  query: string
) {
  const [activeSectionsWithData, setActiveSectionsWithData] = useState<Section[]>([]);

  // Add to active sections the results data and refs when autocomplete results or recommendation results fetched
  useEffect(() => {
    const activeSectionsWithDataValue = getActiveSectionsWithData(
      activeSections,
      sectionsResults,
      sectionsRefs
    );

    if (activeSectionsWithDataValue.length || !query) {
      setActiveSectionsWithData(activeSectionsWithDataValue);
    }
  }, [activeSections, sectionsResults, sectionsRefs, query]);

  return activeSectionsWithData;
}
