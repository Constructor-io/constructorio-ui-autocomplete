import { Product, SearchSuggestion } from "./types";


// Type Guard
export function isProduct(item: Product | SearchSuggestion): item is Product {
  return (item as Product).data.image_url !== undefined;
}
