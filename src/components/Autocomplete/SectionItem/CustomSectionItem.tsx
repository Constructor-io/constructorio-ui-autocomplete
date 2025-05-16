import React, { ReactNode, useContext, useMemo, useEffect, useRef, isValidElement } from 'react';
import { Item } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';

interface CustomItemProps {
  item: Item;
  renderItem: (props: {
    item: Item;
    query: string;
    getItemProps: (item: Item) => any;
  }) => HTMLElement | ReactNode;
  query: string;
}

export default function CustomSectionItem(props: CustomItemProps) {
  const { renderItem, item, query } = props;
  const { getItemProps } = useContext(CioAutocompleteContext);
  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const customElement = useMemo(() => renderItem({ item, query, getItemProps }), [item]);

  const isDomElement = customElement instanceof HTMLElement;
  const isReactNode = isValidElement(customElement);

  useEffect(() => {
    if (isDomElement && ref.current) {
      ref.current.innerHTML = ''; // Clear previous content
      ref.current.appendChild(customElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (isReactNode) {
    return customElement;
  }

  if (isDomElement) {
    return <div {...getItemProps(item)} ref={ref} />;
  }
  return null;
}
