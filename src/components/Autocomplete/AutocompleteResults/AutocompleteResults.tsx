import React, { ReactNode, useContext } from 'react';
import { GetItemProps, SectionConfiguration } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';

export type RenderResults = (renderResultsArguments: {
  sections: SectionConfiguration[];
  getItemProps: GetItemProps;
}) => ReactNode;

type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode;
};

const DefaultRenderResults: RenderResults = ({ sections }) => (
  <>
    {sections?.map((section: SectionConfiguration) => (
      <SectionItemsList section={section} key={section.identifier} />
    ))}
  </>
);

export default function AutocompleteResults(props: AutocompleteResultsProps) {
  const { children = DefaultRenderResults } = props;
  const { sections, isOpen, getMenuProps, getItemProps } = useContext(CioAutocompleteContext);

  const hasResults = sections && sections.some((section) => section?.data?.length);

  let content;
  if (isOpen && hasResults) {
    content = typeof children === 'function' ? children({ sections, getItemProps }) : children;
  } else {
    content = null;
  }

  const menuProps = {
    ...getMenuProps()
  };

  return <ul {...menuProps}>{content}</ul>;
}
