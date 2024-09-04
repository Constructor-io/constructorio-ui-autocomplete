import React, { ReactNode } from 'react';
import { Item } from '../../../types';
import Suggestion from './Suggestion/Suggestion';
import useCioAutocompleteContext from '../../../hooks/useCioAutocompleteContext';

export interface SectionItemProps {
  item: Item;
  children?: ReactNode;
  key?: string;
  displaySearchTermHighlights?: boolean;
}

export default function SectionItem({
  item,
  children,
  displaySearchTermHighlights,
}: SectionItemProps) {
  const { getItemProps } = useCioAutocompleteContext();

  return (
    <li {...getItemProps(item)}>
      {children || (
        <Suggestion item={item} displaySearchTermHighlights={displaySearchTermHighlights} />
      )}
    </li>
  );
}
