import React, { ReactNode } from 'react';
import { useContext } from 'react';
import { AutocompleteResultSections, GetItemProps, SectionOrder } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';
import '../Autocomplete.css';

export type RenderResults = (renderResultsArguments: {
  sections: AutocompleteResultSections;
  sectionOrder: SectionOrder;
  getItemProps: GetItemProps;
}) => ReactNode;

type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode;
};

export default function AutocompleteResults(props: AutocompleteResultsProps) {
  const { children = DefaultRenderResults } = props;
  const { sections, sectionOrder, isOpen, getMenuProps, getItemProps } =
    useContext(CioAutocompleteContext);

  const hasResults = sections && Object.values(sections).some((section) => section?.length);

  let content;
  if (isOpen && hasResults) {
    content =
      typeof children === 'function'
        ? children({ sections, sectionOrder, getItemProps })
        : children;
  } else {
    content = null;
  }

  const menuProps = {
    ...getMenuProps(),
    className: content ? 'showing-content' : ''
  };

  return <ul {...menuProps}>{content}</ul>;
}

const DefaultRenderResults: RenderResults = ({ sectionOrder }) => (
  <>
    {sectionOrder.map((sectionName) => (
      <SectionItemsList sectionName={sectionName} key={sectionName} />
    ))}
  </>
);
