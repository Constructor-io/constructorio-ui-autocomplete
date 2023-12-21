import React, { ReactElement, useContext } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase, toKebabCase } from '../../../utils';
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

  return (
    <li {...getSectionProps(section)}>
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
