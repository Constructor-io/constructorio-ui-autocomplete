import React, { ReactNode, useContext } from 'react';
import { GetItemProps, Section } from '../../../types';
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
  sections?.map((section: Section) => (
    <SectionItemsList section={section} key={section.identifier} />
  ));

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
