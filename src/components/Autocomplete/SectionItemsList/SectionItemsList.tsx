import React, { ReactElement, useContext } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase, translate } from '../../../utils';
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
  const { getSectionProps, query, getFormProps, advancedParameters, getItemProps } =
    useContext(CioAutocompleteContext);
  const { displayShowAllResultsButton, translations } = advancedParameters || {};
  const { onSubmit } = getFormProps();
  const { type, displayName } = section;
  let sectionTitle = displayName;

  if (!sectionTitle) {
    switch (type) {
      case 'recommendations':
        sectionTitle = section.podId;
        break;
      case 'autocomplete':
        sectionTitle = section.indexSectionName;
        break;
      case 'custom':
        sectionTitle = section.displayName;
        break;
      default:
        sectionTitle = section.indexSectionName;
        break;
    }
  }

  if (!section?.data?.length) return null;

  // @deprecated `cio-sectionName` will be removed in the next major release
  return (
    <li {...getSectionProps(section)}>
      <h5 className='cio-section-name cio-sectionName' aria-hidden>
        {camelToStartCase(sectionTitle)}
      </h5>
      <ul className='cio-section-items' role='none'>
        {section?.data?.map((item) => {
          if (typeof section?.renderItem === 'function') {
            return section.renderItem({ item, query, getItemProps });
          }
          return (
            <SectionItem
              item={item}
              key={item?.id}
              displaySearchTermHighlights={section.displaySearchTermHighlights}
            />
          );
        })}
      </ul>
      {displayShowAllResultsButton &&
        type === 'autocomplete' &&
        section.indexSectionName === 'Products' && (
          <div className='cio-section-footer'>
            <button
              data-cnstrc-search-submit-btn
              className='cio-show-all-results-button'
              type='button'
              onClick={onSubmit}>
              {translate('show all results', translations)}
            </button>
          </div>
        )}
    </li>
  );
};

export default function SectionItemsList(props: SectionItemsListProps) {
  const { section, children = DefaultRenderSectionItemsList } = props;

  return children({ section });
}
