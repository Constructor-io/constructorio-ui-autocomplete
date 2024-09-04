import * as React from 'react';
import SectionItemText from '../SectionItemText';
import { Item } from '../../../../types';
import useCioAutocompleteContext from '../../../../hooks/useCioAutocompleteContext';

export interface SearchSuggestionProps {
  item: Item;
  displaySearchTermHighlights?: boolean;
}

export default function SearchSuggestion({
  item,
  displaySearchTermHighlights,
}: SearchSuggestionProps) {
  const { advancedParameters, featureToggles } = useCioAutocompleteContext();

  const { featureDisplaySearchSuggestionImages, featureDisplaySearchSuggestionResultCounts } =
    featureToggles;
  const {
    displaySearchSuggestionImages = featureDisplaySearchSuggestionImages,
    displaySearchSuggestionResultCounts = featureDisplaySearchSuggestionResultCounts,
  } = advancedParameters || {};

  return (
    <>
      {displaySearchSuggestionImages && item.data?.image_url && (
        <img src={item.data?.image_url} alt={item.value} className='cio-suggestion-image' />
      )}
      <p className='cio-suggestion-text'>
        <SectionItemText item={item} highlightSearchTerm={displaySearchTermHighlights} />
      </p>
      {displaySearchSuggestionResultCounts && item.data?.total_num_results && (
        <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
      )}
    </>
  );
}
