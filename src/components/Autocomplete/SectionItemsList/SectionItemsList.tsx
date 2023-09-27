import React, { ReactElement, useContext, useEffect } from 'react';
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
  const sectionName = section?.displayName || section?.identifier;

  if (!section?.data?.length) return null;

  return (
    <li className={`${sectionName} cio-section`} role='none'>
      <h5 className='cio-sectionName' aria-hidden>
        {camelToStartCase(sectionName)}
      </h5>
      <ul className='cio-section-items' role='none'>
        {section?.data?.map((item) => (
          <SectionItem item={item} key={item?.id} />
        ))}
      </ul>
    </li>
  );
};

export default function SectionItemsList(props: SectionItemsListProps) {
  const { section, children = DefaultRenderSectionItemsList } = props;

  // Highlight search suggestion and products words similar to search term
  const { query, sections } = useContext(CioAutocompleteContext);

  const handleBoldSearchTerm = () => {
    const regex = new RegExp(`(${query})`, 'gi');

    document.querySelectorAll('.cio-suggestion-text, .cio-product-text').forEach((el: Element) => {
      const currentText = el.textContent || '';
      const boldText = currentText.replace(regex, '<b>$1</b>');
      // eslint-disable-next-line no-param-reassign
      if (el) el.innerHTML = boldText;
    });
  };

  useEffect(() => {
    handleBoldSearchTerm();
    // eslint-disable-next-line react/destructuring-assignment, react-hooks/exhaustive-deps
  }, [query, sections]);

  return children({ section });
}
