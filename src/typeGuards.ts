import {
  CustomSection,
  InGroupSuggestion,
  Item,
  Product,
  UserDefinedSection,
  SearchSuggestion,
} from './types';

export function isProduct(item: Item): item is Product {
  return (item as Product).section === 'Products';
}

export function isSearchSuggestion(item: Item): item is SearchSuggestion {
  return (item as SearchSuggestion).section === 'Search Suggestions';
}

export function isInGroupSuggestion(item: Item): item is InGroupSuggestion {
  return (item as InGroupSuggestion).groupName !== undefined;
}

export function isCustomSection(config: UserDefinedSection): config is CustomSection {
  return (config as CustomSection).type === 'custom';
}
