import {
  getRecentSearches,
  storeRecentSearch,
  cleanTerm,
  CONSTANTS,
} from '../../src/utils/beaconUtils';

describe('beaconUtils', () => {
  const storageKey = CONSTANTS.RECENT_SEARCHES_STORAGE_KEY.key;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('cleanTerm', () => {
    it('returns the term unchanged when no HTML is present', () => {
      expect(cleanTerm('simple search')).toBe('simple search');
    });

    it('removes script tags from term', () => {
      expect(cleanTerm('<script>alert("xss")</script>search')).toBe('search');
    });

    it('removes img tags from term', () => {
      expect(cleanTerm('<img src="x" onerror="alert(1)">search')).toBe('search');
    });

    it('preserves text content from HTML elements', () => {
      expect(cleanTerm('<span>search term</span>')).toBe('search term');
    });
  });

  describe('getRecentSearches', () => {
    it('returns empty array when localStorage is empty', () => {
      const result = getRecentSearches();
      expect(result).toEqual([]);
    });

    it('returns stored recent searches', () => {
      const searches = [
        { term: 'shoes', ts: 1000 },
        { term: 'pants', ts: 2000 },
      ];
      localStorage.setItem(storageKey, JSON.stringify(searches));

      const result = getRecentSearches();
      expect(result).toEqual(searches);
    });

    it('upgrades legacy string-only format to object format', () => {
      const legacySearches = ['shoes', 'pants'];
      localStorage.setItem(storageKey, JSON.stringify(legacySearches));

      const result = getRecentSearches();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('term', 'shoes');
      expect(result[0]).toHaveProperty('ts');
      expect(result[1]).toHaveProperty('term', 'pants');
      expect(result[1]).toHaveProperty('ts');
    });
  });

  describe('storeRecentSearch', () => {
    it('stores a new search term', () => {
      storeRecentSearch('test search', {});

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].term).toBe('test search');
      expect(stored[0]).toHaveProperty('ts');
    });

    it('trims whitespace from search terms', () => {
      storeRecentSearch('  test search  ', {});

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored[0].term).toBe('test search');
    });

    it('does not store empty terms', () => {
      storeRecentSearch('', {});
      storeRecentSearch('   ', {});

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored).toHaveLength(0);
    });

    it('moves duplicate terms to the end of the list (case insensitive)', () => {
      storeRecentSearch('shoes', {});
      storeRecentSearch('pants', {});
      storeRecentSearch('SHOES', {});

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored).toHaveLength(2);
      expect(stored[0].term).toBe('pants');
      expect(stored[1].term).toBe('SHOES');
    });

    it('stores suggestion data with the search term', () => {
      const suggestionData = { section: 'Products', id: 'prod-123' };
      storeRecentSearch('test', suggestionData);

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored[0].data).toEqual(suggestionData);
    });

    it('resets original_section to section when storing', () => {
      const suggestionData = {
        section: 'recent-searches',
        original_section: 'Search Suggestions',
        is_meta_section: true,
      };
      storeRecentSearch('test', suggestionData);

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored[0].data.section).toBe('Search Suggestions');
      expect(stored[0].data.original_section).toBeUndefined();
      expect(stored[0].data.is_meta_section).toBeUndefined();
    });

    it('limits stored searches to RECENT_SEARCHES_STORAGE_COUNT', () => {
      // Store more than the limit
      for (let i = 0; i < CONSTANTS.RECENT_SEARCHES_STORAGE_COUNT + 10; i++) {
        storeRecentSearch(`search${i}`, {});
      }

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored).toHaveLength(CONSTANTS.RECENT_SEARCHES_STORAGE_COUNT);
      // Oldest searches should be removed
      expect(stored[0].term).toBe('search10');
    });

    it('cleans HTML from search terms', () => {
      storeRecentSearch('<script>alert("xss")</script>clean search', {});

      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(stored[0].term).toBe('clean search');
    });
  });
});
