import { Item, Product } from './types';

// Type Guard
// eslint-disable-next-line
export function isProduct(item: Item): item is Product {
  return (item as Product).data.image_url !== undefined;
}
