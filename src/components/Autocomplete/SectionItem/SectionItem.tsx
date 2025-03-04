import React, { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { Item } from '../../../types';
import { isProduct, isInGroupSuggestion, isSearchSuggestion } from '../../../typeGuards';
import SectionItemText from './SectionItemText';
import { translate } from '../../../utils/helpers';
import SearchSuggestionItem from './SearchSuggestionItem';

export interface SectionItemProps {
  item: Item;
  children?: ReactNode;
  key?: string;
  displaySearchTermHighlights?: boolean;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, children, displaySearchTermHighlights } = props;
  const { getItemProps, advancedParameters, query, getSearchResultsUrl } =
    useContext(CioAutocompleteContext);
  const { translations } = advancedParameters || {};
  let defaultChildren: ReactNode;

  if (isProduct(item)) {
    defaultChildren = (
      <a href={item.data?.url}>
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
      </a>
    );
  } else if (isInGroupSuggestion(item)) {
    defaultChildren = (
      <p className='cio-term-in-group'>
        {translate('in', translations)}{' '}
        <SectionItemText
          item={item}
          query={query}
          highlightSearchTerm={displaySearchTermHighlights}
        />
      </p>
    );
  } else if (isSearchSuggestion(item)) {
    if (getSearchResultsUrl) {
      defaultChildren = (
        <a className='suggestion-link' href={getSearchResultsUrl(item)}>
          <SearchSuggestionItem
            item={item}
            displaySearchTermHighlights={displaySearchTermHighlights}
          />
        </a>
      );
    } else {
      defaultChildren = (
        <SearchSuggestionItem
          item={item}
          displaySearchTermHighlights={displaySearchTermHighlights}
        />
      );
    }
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
