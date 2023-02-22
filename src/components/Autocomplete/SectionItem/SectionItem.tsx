import React, { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { Item } from '../../../types';
import { isProduct } from '../../../typeGuards';

export interface SectionItemProps {
  item: Item;
  index: number;
  sectionIdentifier: string;
  children?: ReactNode;
  key?: string;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, index, sectionIdentifier, children } = props;
  const { getItemProps, featureVariants } = useContext(CioAutocompleteContext);

  const showSuggestionImageAndResultCount =
    featureVariants?.custom_autosuggest_ui_image_result_count;
  const showResultCount =
    featureVariants?.custom_autosuggest_ui_result_count || showSuggestionImageAndResultCount;
  const showSuggestionImage =
    featureVariants?.custom_autosuggest_ui_image || showSuggestionImageAndResultCount;

  let defaultChildren;
  if (sectionIdentifier === 'Products') {
    defaultChildren = (
      <>
        <img data-testid='cio-img' src={item.data?.image_url} alt={item.value} />
        <p data-testid='cio-text'>{item.value}</p>
      </>
    );
  } else {
    // Is a Suggestion
    defaultChildren = (
      <>
        {showSuggestionImage && (
          <img data-testid='cio-suggestion-img' src={item.data?.image_url} alt={item.value} />
        )}
        <span className='cio-suggestion-value'>{item.value}</span>
        {showResultCount && (
          <span className='cio-suggestion-count'> {item.data?.count} Products </span>
        )}
      </>
    );
  }

  return (
    <li {...getItemProps({ item, index, sectionIdentifier })}>{children || defaultChildren}</li>
  );
}
