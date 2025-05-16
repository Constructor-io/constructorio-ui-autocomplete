// eslint-disable-next-line import/no-cycle
import { storageGetArray, storageSetItem } from './storage';

export const CONSTANTS = {
  SEARCH_SUBMIT: 'SEARCH_SUBMIT',
  RECENT_ACTIONS_STORAGE_KEY: {
    scope: 'session',
    key: '_constructorio_recent_actions',
  },
  RECENT_SEARCHES_STORAGE_KEY: {
    scope: 'local',
    key: '_constructorio_recent_searches',
  },
  SEARCH_TERM_STORAGE_KEY: {
    scope: 'session',
    key: '_constructorio_search_term',
  },
  RECENT_SEARCHES_STORAGE_COUNT: 100,
  RECENT_ACTION_STORAGE_COUNT: 5,
};

/*
 * Use the text content of the resulting HTML node(s) created from the
 * term
 */
export const cleanTerm = (term) => {
  // Remove all scripts and image tags from term
  const tmp = document.implementation.createHTMLDocument('');
  tmp.body.innerHTML = term;
  const scriptsAndImages = [...tmp.body.querySelectorAll('script, img')];
  scriptsAndImages.forEach((el) => {
    tmp.body.removeChild(el);
  });
  const nodes = tmp.body.childNodes;
  const texts = [...nodes].map((node) => (node as HTMLElement).innerText || node.textContent);
  return texts.join('');
};

/*
 * Returns a list of recent searches
 */
export const getRecentSearches = () => {
  const recentSearches = storageGetArray(CONSTANTS.RECENT_SEARCHES_STORAGE_KEY) || [];

  // upgrade the array to store timestamps if it isn't already
  recentSearches.forEach((item, i) => {
    if (typeof item === 'string') {
      recentSearches[i] = {
        term: item,
        ts: Date.now(),
      };
    }
  });

  return recentSearches;
};

/*
 * Stores a recent search
 */
export const storeRecentSearch = (term, suggestionData) => {
  const cleanedTerm = cleanTerm(term.trim());
  let recentSearches = getRecentSearches();

  if (cleanedTerm.length > 0) {
    // this ensures it goes onto the end of the array, and only there
    recentSearches = recentSearches.filter(
      (item) => item.term?.toUpperCase() !== cleanedTerm.toUpperCase()
    );

    // reset the section to the original section if it's present because that's
    // the real section we want to store
    if (suggestionData?.original_section) {
      /* eslint-disable no-param-reassign */
      suggestionData.section = suggestionData.original_section;
      delete suggestionData.original_section;
      delete suggestionData.is_meta_section;
      /* eslint-enable no-param-reassign */
    }

    recentSearches.push({
      term: cleanedTerm,
      ts: Date.now(),
      data: suggestionData,
    });
    while (recentSearches.length > CONSTANTS.RECENT_SEARCHES_STORAGE_COUNT) {
      recentSearches.shift();
    }
    storageSetItem(CONSTANTS.RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(recentSearches));
  }
};

/*
 * Returns a list of recent actions
 */
export const getRecentActions = () => storageGetArray(CONSTANTS.RECENT_ACTIONS_STORAGE_KEY) || [];

/*
 * Returns the last action
 */
export const getLastAction = () => {
  const recentActions = getRecentActions();

  if (recentActions && recentActions.length) {
    return recentActions[recentActions.length - 1]?.action;
  }

  return null;
};

/*
 * Stores a recent action
 * Currently only storing search submits, search loads and browse loads
 */
export const storeRecentAction = (action) => {
  let recentActions = getRecentActions();

  if (action) {
    // Only add non-consecutive actions
    if (getLastAction() !== action) {
      recentActions.push({
        action,
        ts: Date.now(),
      });
    }

    if (recentActions.length > CONSTANTS.RECENT_ACTION_STORAGE_COUNT) {
      recentActions = recentActions.slice(-1 * CONSTANTS.RECENT_ACTION_STORAGE_COUNT);
    }
    storageSetItem(CONSTANTS.RECENT_ACTIONS_STORAGE_KEY, JSON.stringify(recentActions));
  }
};
