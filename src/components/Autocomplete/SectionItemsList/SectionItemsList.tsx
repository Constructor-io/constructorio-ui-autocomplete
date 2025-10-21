import React, { ReactElement, useContext } from 'react';
import { Section } from '../../../types';
import SectionItem from '../SectionItem/SectionItem';
import CustomSectionItem from '../SectionItem/CustomSectionItem';
import { translate } from '../../../utils/helpers';
import { camelToStartCase } from '../../../utils/format';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import NoResults from '../AutocompleteResults/NoResults';

export type RenderSectionItemsList = (renderResultsArguments: {
  section: Section;
}) => ReactElement | null;

type SectionItemsListProps = {
  section: Section;
  children?: RenderSectionItemsList;
};

// eslint-disable-next-line func-names
const DefaultRenderSectionItemsList: RenderSectionItemsList = function ({ section }) {
  const { getSectionProps, query, getFormProps, advancedParameters } =
    useContext(CioAutocompleteContext);
  const { displayShowAllResultsButton, translations } = advancedParameters || {};
  const { onSubmit } = getFormProps();
  const { type, displayName, displayNoResultsMessage } = section;
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

  // Display no results message
  if (!section?.data?.length && displayNoResultsMessage)
    return (
      <li {...getSectionProps(section)}>
        <h5 className='cio-section-name cio-sectionName' aria-hidden>
          {camelToStartCase(sectionTitle)}
        </h5>
        <NoResults />
      </li>
    );

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
            return (
              <CustomSectionItem
                renderItem={section.renderItem}
                item={item}
                query={query}
                key={item?.data?.variation_id || item?.id}
              />
            );
          }
          return (
            <SectionItem
              item={item}
              key={item?.data?.variation_id || item?.id}
              displaySearchTermHighlights={section.displaySearchTermHighlights}
            />
          );
        })}
      </ul>
      {displayShowAllResultsButton &&
        (typeof type === 'undefined' || type === 'autocomplete') &&
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
