import React, { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { Item } from '../../../types';
import { isProduct, isInGroupSuggestion } from '../../../typeGuards';

export interface SectionItemProps {
  item: Item;
  children?: ReactNode;
  key?: string;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, children } = props;
  const { getItemProps } = useContext(CioAutocompleteContext);

  let defaultChildren;
  if (isProduct(item)) {
    defaultChildren = (
      <>
        <img data-testid='cio-img' src={item.data?.image_url} alt={item.value} />
        <p data-testid='cio-text'>{item.value}</p>
      </>
    );
  } else if (isInGroupSuggestion(item)) {
    defaultChildren = <p className='cio-term-in-group'>in {item.groupName}</p>;
  } else {
    defaultChildren = <p>{item.value}</p>;
  }

  return <li {...getItemProps(item)}>{children || defaultChildren}</li>;
}
