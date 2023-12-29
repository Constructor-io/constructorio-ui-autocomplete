import React, { ReactElement, useContext } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';

export type RenderSectionItemsList = (renderResultsArguments: {
  section: Section;
}) => ReactElement | null;

type SectionItemsListProps = {
  section: Section;
  children?: RenderSectionItemsList;
  key?: string;
};

// eslint-disable-next-line func-names
const DefaultRenderSectionItemsList: RenderSectionItemsList = function ({ section }) {
  const { getSectionProps } = useContext(CioAutocompleteContext);

  const sectionName = section?.displayName || section?.identifier;

  if (!section?.data?.length) return null;

  return (
    <li {...getSectionProps(section)}>
      <h5 className='cio-sectionName' aria-hidden>
        {camelToStartCase(sectionName)}
      </h5>
      <ul className='cio-section-items' role='none'>
        {section?.data?.map((item) => (
          <SectionItem
            item={item}
            key={item?.id}
            displaySearchTermHighlights={section.displaySearchTermHighlights}
          />
        ))}
      </ul>
    </li>
  );
};

export default function SectionItemsList(props: SectionItemsListProps) {
  const { section, children = DefaultRenderSectionItemsList } = props;

  return children({ section });
}
