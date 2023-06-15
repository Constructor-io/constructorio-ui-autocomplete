import { Item, Section } from '../types';

const useItems = (activeSectionsWithData: Section[]) => {
  const items: Item[] = [];
  activeSectionsWithData?.forEach((config: Section) => {
    if (config?.data) {
      items.push(...config.data);
    }
  });

  return items;
};

export default useItems;
