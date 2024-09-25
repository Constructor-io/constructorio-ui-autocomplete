import * as React from 'react';
import SectionItemText from '../SectionItemText';
import { Item } from '../../../../types';

export interface CustomSuggestionProps {
  item: Item;
  displaySearchTermHighlights?: boolean;
}

export default function CustomSuggestion({
  item,
  displaySearchTermHighlights,
}: CustomSuggestionProps) {
  return (
    <p className='cio-custom-text'>
      <SectionItemText item={item} highlightSearchTerm={displaySearchTermHighlights} />
    </p>
  );
}
