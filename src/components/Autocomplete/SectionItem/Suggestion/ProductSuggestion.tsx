import * as React from 'react';
import SectionItemText from '../SectionItemText';
import { Item } from '../../../../types';

export interface ProductSuggestionProps {
  item: Item;
  displaySearchTermHighlights?: boolean;
}

export default function ProductSuggestion({
  item,
  displaySearchTermHighlights,
}: ProductSuggestionProps) {
  return (
    <>
      <img
        data-testid='cio-img'
        src={item.data?.image_url}
        alt={item.value}
        className='cio-product-image'
      />
      <p data-testid='cio-text' className='cio-product-text'>
        <SectionItemText item={item} highlightSearchTerm={displaySearchTermHighlights} />
      </p>
    </>
  );
}
