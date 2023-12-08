import React, { ReactNode, useContext } from 'react';
import { GetItemProps, Section } from '../../../types';
import { toKebabCase } from '../../../utils';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';

export type RenderResults = (renderResultsArguments: {
  sections: Section[];
  getItemProps: GetItemProps;
}) => ReactNode;

type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode;
};

const DefaultRenderResults: RenderResults = ({ sections }) =>
  sections?.map((section: Section) => {
    const { type } = section;
    let key = section.displayName;

    switch (type) {
      case 'recommendations':
        key = section.podId;
        break;
      case 'custom':
        key = toKebabCase(section.displayName);
        break;
      case 'autocomplete':
        key = section.indexSection;
        break;
      default:
        key = section.indexSection;
        break;
    }

    return <SectionItemsList section={section} key={key} />;
  });

export default function AutocompleteResults(props: AutocompleteResultsProps) {
  const { children = DefaultRenderResults } = props;
  const { sections, isOpen, getMenuProps, getItemProps } = useContext(CioAutocompleteContext);

  const hasResults = sections && sections.some((section) => section?.data?.length);

  const menuProps = {
    ...getMenuProps(),
  };

  let content;
  if (isOpen && hasResults) {
    content = typeof children === 'function' ? children({ sections, getItemProps }) : children;
  } else {
    content = null;
    menuProps.style = {
      display: 'none',
    };
  }

  return <ul {...menuProps}>{content}</ul>;
}
