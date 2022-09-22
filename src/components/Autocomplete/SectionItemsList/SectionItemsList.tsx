import React from 'react'
import { useContext } from 'react';
import { RenderSectionItemsList, SectionName } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';

type SectionItemsListProps = {
  sectionName: SectionName;
  children?: RenderSectionItemsList;
};

export default function SectionItemsList(props: SectionItemsListProps) {
  const { sections } = useContext(CioAutocompleteContext);
  const { sectionName, children = DefaultRenderSectionItemsList } = props;
  const sectionItems = sections?.[sectionName];

  return children({ sectionName, sectionItems });
}

const DefaultRenderSectionItemsList: RenderSectionItemsList = ({ sectionName, sectionItems = [] }) => (
  <li className={`${sectionName} cio-section`}>
    <h5 className='cio-sectionName'>{camelToStartCase(sectionName)}</h5>
    <ul className='cio-items'>
      {sectionItems?.map((item, index) => (
        <SectionItem item={item} index={index} sectionName={sectionName} key={`${sectionName}_${item.data?.id}`} />
      ))}
    </ul>
  </li>
);