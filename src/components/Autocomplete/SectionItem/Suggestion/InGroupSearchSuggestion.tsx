import * as React from 'react';
import SectionItemText from '../SectionItemText';
import { Item, Translations } from '../../../../types';
import { translate } from '../../../../utils';

export interface InGroupSearchSuggestionProps {
  item: Item;
  displaySearchTermHighlights?: boolean;
  translations?: Translations;
}

export default function InGroupSearchSuggestion({
  item,
  displaySearchTermHighlights,
  translations,
}: InGroupSearchSuggestionProps) {
  return (
    <p className='cio-term-in-group'>
      {translate('in', translations)}{' '}
      <SectionItemText item={item} highlightSearchTerm={displaySearchTermHighlights} />
    </p>
  );
}
