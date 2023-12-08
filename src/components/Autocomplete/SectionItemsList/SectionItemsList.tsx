import React, { ReactElement } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';

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
  const { type, displayName } = section;
  let sectionName = displayName;

  if (!sectionName) {
    switch (type) {
      case 'recommendations':
        sectionName = section.podId;
        break;
      case 'autocomplete':
        sectionName = section.indexSection;
        break;
      case 'custom':
        sectionName = section.displayName;
        break;
      default:
        sectionName = section.indexSection;
        break;
    }
  }

  if (!section?.data?.length) return null;

  // TODO: Add explanation here
  const recommendationsSection = type === 'recommendations' ? section.indexSection : '';

  return (
    <li className={`${sectionName} cio-section ${recommendationsSection}`} role='none'>
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
