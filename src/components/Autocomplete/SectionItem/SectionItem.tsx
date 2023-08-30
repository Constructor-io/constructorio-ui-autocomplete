import React, { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { Item } from '../../../types';
import { isProduct, isInGroupSuggestion, isSearchSuggestion } from '../../../typeGuards';

export interface SectionItemProps {
  item: Item;
  children?: ReactNode;
  key?: string;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, children } = props;
  const { getItemProps, advancedParameters } = useContext(CioAutocompleteContext);
  const { displaySearchSuggestionImages, displaySearchSuggestionResultCounts } =
    advancedParameters || {};
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
          {item.value}
        </p>
      </>
    );
  } else if (isInGroupSuggestion(item)) {
    defaultChildren = <p className='cio-term-in-group'>in {item.groupName}</p>;
  } else if (isSearchSuggestion(item)) {
    defaultChildren = (
      <>
        {displaySearchSuggestionImages && (
          <img src={item.data?.image_url} alt={item.value} className='cio-suggestion-image' />
        )}
        <p className='cio-suggestion-text'>{item.value}</p>
        {displaySearchSuggestionResultCounts && (
          <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
        )}
      </>
    );
  } else {
    defaultChildren = <p className='cio-custom-text'>{item.value}</p>;
  }

  return <li {...getItemProps(item)}>{children || defaultChildren}</li>;
}
