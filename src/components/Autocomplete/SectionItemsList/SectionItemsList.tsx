import React, { ReactElement } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase, toKebabCase } from '../../../utils';

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
  let sectionTitle = displayName;

  if (!sectionTitle) {
    switch (type) {
      case 'recommendations':
        sectionTitle = section.podId;
        break;
      case 'autocomplete':
        sectionTitle = section.indexSection;
        break;
      case 'custom':
        sectionTitle = section.displayName;
        break;
      default:
        sectionTitle = section.indexSection;
        break;
    }
  }

  if (!section?.data?.length) return null;

  // Add the indexSection as a class to the section container to make sure it gets the styles
  // Even if the section is a recommendation pod, if the results are "Products" or "Search Suggestions"
  // ... they should be styled accordingly
  const indexSection = type !== 'custom' ? toKebabCase(section.indexSection) : '';

  return (
    <li className={`${sectionTitle} cio-section ${indexSection}`} role='none'>
      <h5 className='cio-sectionName' aria-hidden>
        {camelToStartCase(sectionTitle)}
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
