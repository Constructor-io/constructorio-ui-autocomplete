import React, { ReactElement } from 'react';
import { SectionConfiguration } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';

export type RenderSectionItemsList = (renderResultsArguments: {
  section: SectionConfiguration;
}) => ReactElement;

type SectionItemsListProps = {
  section: SectionConfiguration;
  children?: RenderSectionItemsList;
};

export default function SectionItemsList(props: SectionItemsListProps) {
  const { section, children = DefaultRenderSectionItemsList } = props;

  return children({ section });
}

const DefaultRenderSectionItemsList: RenderSectionItemsList = ({ section }) => {
  const sectionName = section?.displayName || section?.identifier;

  return (
    <li className={`${sectionName} cio-section`}>
      <h5 className='cio-sectionName'>{camelToStartCase(sectionName)}</h5>
      <ul className='cio-items'>
        {section?.data?.map((item, index) => (
          <SectionItem
            item={item}
            index={index}
            sectionIdentifier={section?.identifier}
            key={`${section?.identifier}_${item.data.id}`}
          />
        ))}
      </ul>
    </li>
  );
};
