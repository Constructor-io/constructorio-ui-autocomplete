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

const getSectionTitle = (section: Section): string => {
  const { type, displayName } = section;

  switch (type) {
    case 'recommendations':
      return section.podId;
    case 'autocomplete':
      return section.indexSectionName;
    case 'custom':
      return displayName;
    default:
      return section.indexSectionName;
  }
};

// eslint-disable-next-line func-names
const DefaultRenderSectionItemsList: RenderSectionItemsList = function ({ section }) {
  const { getSectionProps } = useContext(CioAutocompleteContext);
  const { displayName } = section;
  const sectionTitle = camelToStartCase(displayName || getSectionTitle(section));

  if (!section?.data?.length) return null;

  // @deprecated `cio-sectionName` will be removed in the next major release
  return (
    <li {...getSectionProps(section)}>
      <h5 className='cio-section-name cio-sectionName' aria-hidden>
        {sectionTitle}
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
