import React from 'react'
import { ReactNode, useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import {  Item, SectionName } from '../../../types';
import {  isProduct } from '../../../typeGuards';

export interface SectionItemProps {
  item: Item;
  index: number;
  sectionName: SectionName;
  children?: ReactNode;
}

export default function SectionItem(props: SectionItemProps) {
  const { item, index, sectionName, children } = props;
  const { getItemProps } = useContext(CioAutocompleteContext);

  let defaultChildren;
  if (isProduct(item)) {
    defaultChildren = (
      <>
        <img src={item.data?.image_url} alt='' />
        <p>{item.value}</p>
      </>
    );
  } else {
    defaultChildren = item.value;
  }

  return <li {...getItemProps({ item, index, sectionName })} className='cio-item'>{children ? children : defaultChildren}</li>;
}
