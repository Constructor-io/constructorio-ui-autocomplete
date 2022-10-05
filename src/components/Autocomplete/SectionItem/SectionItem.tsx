import React from 'react'
import { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import {  Item } from '../../../types';
import {  isProduct } from '../../../typeGuards';

export interface SectionItemProps {
  item: Item;
  index: number;
  sectionName: string;
  children?: ReactNode;
}

export default function SectionItem(props: SectionItemProps) {
  const { item } = props
  let defaultChildren;
  if (isProduct(item)) {
    defaultChildren = (
      <>
        <img data-testid='cio-img' src={item.data?.image_url} alt={item.value} />
        <p data-testid='cio-text'>{item.value}</p>
      </>
    );
  } else {
    defaultChildren = item.value;
  }

  const { index, sectionName, children = defaultChildren } = props;
  const { getItemProps } = useContext(CioAutocompleteContext);

  return <li {...getItemProps({ item, index, sectionName })}>{children}</li>;
}
