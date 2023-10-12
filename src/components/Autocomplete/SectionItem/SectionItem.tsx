import React, { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { Item } from '../../../types';
import { isProduct, isInGroupSuggestion, isSearchSuggestion } from '../../../typeGuards';
import SectionItemText from './SectionItemText';

export interface SectionItemProps {
  item: Item;
  children?: ReactNode;
  key?: string;
  displaySearchTermHighlights?: boolean;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, children, displaySearchTermHighlights } = props;
  const { getItemProps, advancedParameters, query, featureToggles } =
    useContext(CioAutocompleteContext);
  const { featureDisplaySearchSuggestionImages, featureDisplaySearchSuggestionResultCounts } =
    featureToggles;
  const {
    displaySearchSuggestionImages = featureDisplaySearchSuggestionImages,
    displaySearchSuggestionResultCounts = featureDisplaySearchSuggestionResultCounts,
  } = advancedParameters || {};
  let defaultChildren: ReactNode;

  if (isProduct(item)) {
    defaultChildren = (
      <>
        <img
          data-testid='cio-img'
          src={item.data?.image_url}
          alt={item.value}
          className='cio-product-image'
        />
        <p data-testid='cio-text' className='cio-product-text'>
          <SectionItemText
            item={item}
            query={query}
            highlightSearchTerm={displaySearchTermHighlights}
          />
        </p>
      </>
    );
  } else if (isInGroupSuggestion(item)) {
    defaultChildren = (
      <p className='cio-term-in-group'>
        in{' '}
        <SectionItemText
          item={item}
          query={query}
          highlightSearchTerm={displaySearchTermHighlights}
        />
      </p>
    );
  } else if (isSearchSuggestion(item)) {
    defaultChildren = (
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
  } else {
    defaultChildren = (
      <p className='cio-custom-text'>
        <SectionItemText
          item={item}
          query={query}
          highlightSearchTerm={displaySearchTermHighlights}
        />
      </p>
    );
  }

  return <li {...getItemProps(item)}>{children || defaultChildren}</li>;
}
