import React from 'react';
import { Item } from '../../../types';
import { isInGroupSuggestion } from '../../../typeGuards';
import { escapeRegExp } from '../../../utils/helpers';

export interface SectionItemTextProps {
  item: Item;
  query: string;
  highlightSearchTerm?: boolean;
}

export default function SectionItemText({
  item,
  query,
  highlightSearchTerm,
}: SectionItemTextProps) {
  const itemText = isInGroupSuggestion(item) ? item.groupName : item.value;

  if (highlightSearchTerm) {
    const queryRegex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const queryIncludedInText = queryRegex.test(itemText);

    if (query && queryIncludedInText) {
      const splitText = itemText.split(queryRegex);

      return (
        <>
          {splitText.map((split, index) => {
            // eslint-disable-next-line react/no-array-index-key
            if (queryRegex.test(split)) return <b key={`matched-word-${index}`}>{split}</b>;
            return split;
          })}
        </>
      );
    }
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{itemText}</>;
}
