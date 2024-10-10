import React, { useContext } from 'react';
import SectionItemText from './SectionItemText';
import { SearchSuggestion } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';

interface SearchSuggestionItemProps {
  item: SearchSuggestion;
  displaySearchTermHighlights?: boolean;
}
export default function SearchSuggestionItem(props: SearchSuggestionItemProps) {
  const { item, displaySearchTermHighlights } = props;
  const { advancedParameters, query, featureToggles } = useContext(CioAutocompleteContext);
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
        <SectionItemText
          item={item}
          query={query}
          highlightSearchTerm={displaySearchTermHighlights}
        />
      </p>
      {displaySearchSuggestionResultCounts && item.data?.total_num_results && (
        <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
      )}
    </>
  );
}
