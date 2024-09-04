import React from 'react';
import { isProduct, isInGroupSuggestion, isSearchSuggestion } from '../../../../typeGuards';
import ProductSuggestion from './ProductSuggestion';
import InGroupSearchSuggestion from './InGroupSearchSuggestion';
import SearchSuggestion from './SearchSuggestion';
import CustomSuggestion from './CustomSuggestion';
import { Item } from '../../../../types';

export interface SuggestionProps {
  item: Item;
  displaySearchTermHighlights?: boolean;
}

export default function Suggestion({ item, displaySearchTermHighlights }: SuggestionProps) {
  if (isProduct(item)) {
    return (
      <ProductSuggestion item={item} displaySearchTermHighlights={displaySearchTermHighlights} />
    );
  }

  if (isInGroupSuggestion(item)) {
    return (
      <InGroupSearchSuggestion
        item={item}
        displaySearchTermHighlights={displaySearchTermHighlights}
      />
    );
  }

  if (isSearchSuggestion(item)) {
    return (
      <SearchSuggestion item={item} displaySearchTermHighlights={displaySearchTermHighlights} />
    );
  }

  return <CustomSuggestion item={item} displaySearchTermHighlights={displaySearchTermHighlights} />;
}
