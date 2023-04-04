import { CustomSection, InGroupSuggestion, Item, Product, UserDefinedSection } from './types';

export function isProduct(item: Item): item is Product {
  return (item as Product).data?.image_url !== undefined;
}

export function isInGroupSuggestion(item: Item): item is InGroupSuggestion {
  return (item as InGroupSuggestion).groupName !== undefined;
}

export function isCustomSection(config: UserDefinedSection): config is CustomSection {
  return (config as CustomSection).data !== undefined;
}
