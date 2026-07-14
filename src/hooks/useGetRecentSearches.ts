import { useEffect, useState } from 'react';
import { RecentSearchesSectionConfiguration, SectionsData, StoreRecentSearches } from '../types';
import { getRecentSearches } from '../utils/beaconUtils';
import { DEFAULT_NUM_RESULTS } from '../constants';

const useGetRecentSearches = (recentSearchesSections: RecentSearchesSectionConfiguration[]) => {
  const [recentSearches, setRecentSearches] = useState<SectionsData>({});

  useEffect(() => {
    if (!recentSearchesSections.length) return;

    const recentSearchesFromStore: StoreRecentSearches[] = getRecentSearches();
    const recentSearchesResults: SectionsData = {};

    recentSearchesSections.forEach(({ displayName, numResults }) => {
      recentSearchesResults[displayName] = recentSearchesFromStore
        .slice()
        .reverse()
        .slice(0, numResults || DEFAULT_NUM_RESULTS)
        .map(({ term, ts, data }) => ({
          ts,
          data,
          id: `${term}-${ts}`,
          value: term,
          section: 'recent-searches',
        }));
    });

    setRecentSearches(recentSearchesResults);
  }, [recentSearchesSections]);

  return recentSearches;
};

export default useGetRecentSearches;
