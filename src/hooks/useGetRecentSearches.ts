import { useEffect, useState } from 'react';
import { RecentSearchesSectionConfiguration, SectionsData } from '../types';
import { getRecentSearches } from '../utils/beaconUtils';

const useGetRecentSearches = (recentSearchesSection: RecentSearchesSectionConfiguration[]) => {
  const [recentSearches, setRecentSearches] = useState<SectionsData>({});

  useEffect(() => {
    if (!recentSearchesSection.length) return;

    const recentSearchesFromStore = getRecentSearches();
    const recentSearchesResults = {};

    recentSearchesSection.forEach(({ displayName, numResults }) => {
      recentSearchesResults[displayName] = recentSearchesFromStore
        .slice(0, numResults)
        .map(({ term, ts }) => ({
          value: term,
          id: ts,
          is_slotted: false,
          labels: {},
          matched_terms: [],
          section: 'recent-searches',
        }));
    });

    setRecentSearches(recentSearchesResults);
  }, [recentSearchesSection]);

  return recentSearches;
};

export default useGetRecentSearches;
