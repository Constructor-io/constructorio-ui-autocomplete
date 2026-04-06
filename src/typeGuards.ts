import {
  CustomSection,
  InGroupSuggestion,
  Item,
  Product,
  UserDefinedSection,
  SearchSuggestion,
  AutocompleteSection,
  RecommendationsSection,
  RecentSearchesSectionConfiguration,
  RecentSearch,
} from './types';

export function isProduct(item: Item): item is Product {
  return (item as Product).section === 'Products';
}

export function isSearchSuggestion(item: Item): item is SearchSuggestion {
  return (item as SearchSuggestion).section === 'Search Suggestions';
}

export function isRecentSearch(item: Item): item is RecentSearch {
  return (item as RecentSearch).section === 'recent-searches';
}

export function isInGroupSuggestion(item: Item): item is InGroupSuggestion {
  return (item as InGroupSuggestion).groupName !== undefined;
}

export function isCustomSection(config: UserDefinedSection): config is CustomSection {
  return (config as CustomSection).type === 'custom';
}

export function isAutocompleteSection(config: UserDefinedSection): config is AutocompleteSection {
  return (config as AutocompleteSection).type === 'autocomplete' || !config.type;
}

export function isRecommendationsSection(
  config: UserDefinedSection
): config is RecommendationsSection {
  return (config as RecommendationsSection).type === 'recommendations';
}

export function isRecentSearchesSection(
  config: UserDefinedSection
): config is RecentSearchesSectionConfiguration {
  return (config as RecentSearchesSectionConfiguration).type === 'recentSearches';
}
