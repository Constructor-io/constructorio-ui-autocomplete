import React, { ReactNode, useContext } from 'react';
import { AutocompleteRequestType } from '@constructor-io/constructorio-client-javascript/lib/types';
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

export function getSearchSuggestionFeatures(request: Partial<AutocompleteRequestType>) {
  let featureDisplaySearchSuggestionImages = false;
  let featureDisplaySearchSuggestionResultCounts = false;
  if (request?.features?.custom_autosuggest_ui === true) {
    switch (request?.feature_variants?.custom_autosuggest_ui) {
      case 'custom_autosuggest_ui_result_count':
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      case 'custom_autosuggest_ui_image':
        featureDisplaySearchSuggestionImages = true;
        break;
      case 'custom_autosuggest_ui_image_result_count':
        featureDisplaySearchSuggestionImages = true;
        featureDisplaySearchSuggestionResultCounts = true;
        break;
      default:
        break;
    }
  }
  return {
    featureDisplaySearchSuggestionImages,
    featureDisplaySearchSuggestionResultCounts,
  };
}

export default function SectionItem(props: SectionItemProps) {
  const { item, children, displaySearchTermHighlights } = props;
  const { getItemProps, advancedParameters, query, request } = useContext(CioAutocompleteContext);
  const { featureDisplaySearchSuggestionImages, featureDisplaySearchSuggestionResultCounts } =
    getSearchSuggestionFeatures(request);
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
