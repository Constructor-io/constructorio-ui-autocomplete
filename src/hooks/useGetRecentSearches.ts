import { useEffect, useState } from 'react';
import { RecentSearchesSectionConfiguration, SectionsData, StoreRecentSearch } from '../types';
import { getRecentSearches } from '../utils/beaconUtils';
import { DEFAULT_NUM_RESULTS } from '../constants';

const useGetRecentSearches = (recentSearchesSections: RecentSearchesSectionConfiguration[]) => {
  const [recentSearches, setRecentSearches] = useState<SectionsData>({});

  useEffect(() => {
    if (!recentSearchesSections.length) return;

    const recentSearchesFromStore: StoreRecentSearch[] = getRecentSearches();
    const recentSearchesResults: SectionsData = {};

    recentSearchesSections.forEach(({ displayName, numResults }) => {
      recentSearchesResults[displayName] = recentSearchesFromStore
        .reverse()
        .slice(0, numResults || DEFAULT_NUM_RESULTS)
        .map(({ term, ts, data }) => ({
          ts,
          data,
          id: ts,
          value: term,
          section: 'recent-searches',
        }));
    });

    setRecentSearches(recentSearchesResults);
  }, [recentSearchesSections]);

  return recentSearches;
};

export default useGetRecentSearches;

