import React, { ReactNode } from 'react'
import { useContext } from 'react';
import { RenderResults, SectionConfiguration } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';
import '../Autocomplete.css'

type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode
};

export default function AutocompleteResults(props: AutocompleteResultsProps) {
  const { children = DefaultRenderResults } = props;
  const { sections, isOpen, getMenuProps, getItemProps } = useContext(CioAutocompleteContext);

  const hasResults = sections && sections.some(section => section?.data?.length);

  let content;
  if (isOpen && hasResults) {
    content = typeof children === 'function' ?  children({ sections, getItemProps }) : children;
  } else {
    content = null;
  }

  const menuProps = {
    ...getMenuProps(),
    className: content ? 'showing-content' : '',
  };

  return <ul {...menuProps} className='cio-results'>{content}</ul>;
}

const DefaultRenderResults: RenderResults = ({ sections }) => (
  <>
    {sections?.map((section: SectionConfiguration) => (
      <SectionItemsList section={section} key={section.identifier} />
    ))}
  </>
);
