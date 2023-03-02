import React, { ReactElement } from 'react';
import { SectionConfiguration } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';

export type RenderSectionItemsList = (renderResultsArguments: {
  section: SectionConfiguration;
}) => ReactElement | null;

type SectionItemsListProps = {
  section: SectionConfiguration;
  children?: RenderSectionItemsList;
  key?: string;
};

// eslint-disable-next-line func-names
const DefaultRenderSectionItemsList: RenderSectionItemsList = function ({ section }) {
  const sectionName = section?.displayName || section?.identifier;

  if (!section?.data?.length) return null;

  return (
    <li className={`${sectionName} cio-section`} role='none'>
      <h5 className='cio-sectionName' aria-hidden>
        {camelToStartCase(sectionName)}
      </h5>
      <ul className='cio-section-items' role='none'>
        {section?.data?.map((item, index) => (
          <SectionItem
            item={item}
            index={index}
            sectionIdentifier={section?.identifier}
            key={`${section?.identifier}_${item?.data?.id}`}
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
