import React, { ReactNode, useContext } from 'react';
import { Item, Section } from '../../../types';
import { toKebabCase } from '../../../utils';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';
import CloseIcon from './CloseIcon';

export type RenderResults = (renderResultsArguments: {
  sections: Section[];
  getItemProps: (item: Item) => any;
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
        key = section.indexSectionName;
        break;
      default:
        key = section.indexSectionName;
        break;
    }

    return <SectionItemsList section={section} key={key} />;
  });

export default function AutocompleteResults(props: AutocompleteResultsProps) {
  const { children = DefaultRenderResults } = props;
  const { sections, isOpen, getMenuProps, getItemProps, closeMenu } =
    useContext(CioAutocompleteContext);

  const hasResults = sections && sections.some((section) => section?.data?.length);

  const menuProps = {
    ...getMenuProps(),
  };

  let content;
  if (isOpen && hasResults) {
    content = (
      <>
        <CloseIcon onClick={() => closeMenu()} />
        {typeof children === 'function' ? children({ sections, getItemProps }) : children}
      </>
    );
  } else {
    content = null;
    menuProps.style = {
      display: 'none',
    };
  }

  return <ul {...menuProps}>{content}</ul>;
}
