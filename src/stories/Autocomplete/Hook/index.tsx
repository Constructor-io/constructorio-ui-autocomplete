/* eslint-disable no-param-reassign */
import React from 'react';
import useCioAutocomplete from '../../../hooks/useCioAutocomplete';
import { isRecommendationsSection } from '../../../typeGuards';
import { Item } from '../../../types';
import { camelToStartCase, getStoryParams, toKebabCase } from '../../../utils';

export function HooksTemplate(args) {
  const {
    isOpen,
    sections,
    getFormProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    getSectionProps,
    setQuery,
    autocompleteClassName,
    advancedParameters,
  } = useCioAutocomplete(args);
  const { displaySearchSuggestionImages, displaySearchSuggestionResultCounts } =
    advancedParameters || {};

  const inputProps = getInputProps();

  const renderItem = (item: Item) => {
    const imageClassName =
      item.section === 'Products' ? 'cio-product-image' : 'cio-suggestion-image';
    const textClassName = item.section === 'Products' ? 'cio-product-text' : 'cio-suggestion-text';
    let displayImage = false;

    if (item.section === 'Products' && item.data?.image_url) {
      displayImage = true;
    }

    if (item.section === 'Search Suggestions') {
      if (displaySearchSuggestionImages && item.data?.image_url) {
        displayImage = true;
      }
    }

    return (
      <div {...getItemProps(item)} key={item?.id}>
        {displayImage && (
          <img
            src={item.data?.image_url}
            alt={item.value}
            className={imageClassName}
            data-testid='cio-img'
          />
        )}
        {item.groupName ? (
          <p className='cio-term-in-group'>in {item.groupName}</p>
        ) : (
          <p className={textClassName}>{item.value}</p>
        )}
        {displaySearchSuggestionResultCounts && item.data?.total_num_results && (
          <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
        )}
      </div>
    );
  };

  return (
    <div className={autocompleteClassName}>
      <form {...getFormProps()}>
        <label htmlFor='cio-input' {...getLabelProps()}>
          <input id='cio-input' {...inputProps} />
        </label>
        <button
          className='cio-clear-btn'
          data-testid='cio-clear-btn'
          hidden={!inputProps.value}
          onClick={() => {
            setQuery('');
            if (inputProps.id) {
              setTimeout(() => document.getElementById(inputProps.id)?.focus(), 100);
            }
          }}
          type='button'
          aria-label='Clear search field text'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z' />
            </svg>
          </div>
        </button>
        <button
          className='cio-submit-btn'
          data-testid='cio-submit-btn'
          disabled={!inputProps.value}
          type='submit'
          aria-label='Submit Search'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
            </svg>
          </div>
        </button>
      </form>
      <div {...getMenuProps()}>
        {isOpen &&
          sections?.map((section) => {
            if (!section?.data?.length) {
              return null;
            }

            const { type, displayName } = section;
            let sectionTitle: string;

            switch (type) {
              case 'recommendations':
                sectionTitle = section.podId;
                break;
              case 'custom':
                sectionTitle = displayName;
                break;
              case 'autocomplete':
                sectionTitle = section.indexSectionName;
                break;
              default:
                sectionTitle = section.indexSectionName;
                break;
            }

            if (displayName) {
              sectionTitle = displayName;
            }

            const sectionClassNames = toKebabCase(sectionTitle);
            if (isRecommendationsSection(section)) {
              sectionClassNames.concat(` ${toKebabCase(section.indexSectionName)}`);
            }

            return (
              <div key={sectionTitle} className={sectionClassNames}>
                <div {...getSectionProps(section)}>
                  <h5 className='cio-section-name'>{camelToStartCase(sectionTitle)}</h5>
                  <div className='cio-section-items'>
                    {section?.data?.map((item) => renderItem(item))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const hooksTemplateCode = `
function YourComponent() {
  const {
    isOpen,
    sections,
    getFormProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    setQuery,
    autocompleteClassName,
    advancedParameters,
  } = useCioAutocomplete(args);
  const { displaySearchSuggestionImages, displaySearchSuggestionResultCounts } =
    advancedParameters || {};

  const inputProps = getInputProps();

  const renderItem = (item: Item) => {
    const imageClassName =
      item.section === 'Products' ? 'cio-product-image' : 'cio-suggestion-image';
    const textClassName = item.section === 'Products' ? 'cio-product-text' : 'cio-suggestion-text';
    let displayImage = false;

    if (item.section === 'Products' && item.data?.image_url) {
      displayImage = true;
    }

    if (item.section === 'Search Suggestions') {
      if (displaySearchSuggestionImages && item.data?.image_url) {
        displayImage = true;
      }
    }

    return (
      <div {...getItemProps(item)} key={item?.id}>
        {displayImage && (
          <img
            src={item.data?.image_url}
            alt={item.value}
            className={imageClassName}
            data-testid='cio-img'
          />
        )}
        {item.groupName ? (
          <p className='cio-term-in-group'>in {item.groupName}</p>
        ) : (
          <p className={textClassName}>{item.value}</p>
        )}
        {displaySearchSuggestionResultCounts && item.data?.total_num_results && (
          <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
        )}
      </div>
    );
  };

  return (
    <div className={autocompleteClassName}>
      <form {...getFormProps()}>
        <label htmlFor='cio-input' {...getLabelProps()}>
          <input id='cio-input' {...inputProps} />
        </label>
        <button
          className='cio-clear-btn'
          data-testid='cio-clear-btn'
          hidden={!inputProps.value}
          onClick={() => {
            setQuery('');
            if (inputProps.id) {
              setTimeout(() => document.getElementById(inputProps.id)?.focus(), 100);
            }
          }}
          type='button'
          aria-label='Clear search field text'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z' />
            </svg>
          </div>
        </button>
        <button
          className='cio-submit-btn'
          data-testid='cio-submit-btn'
          disabled={!inputProps.value}
          type='submit'
          aria-label='Submit Search'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
            </svg>
          </div>
        </button>
      </form>
      <div {...getMenuProps()}>
        {isOpen &&
          sections?.map((section) => {
            if (!section?.data?.length) {
              return null;
            }
            const { type, displayName } = section;
            let sectionName = section.displayName;

            switch (type) {
              case 'recommendations':
                sectionName = section.podId;
                break;
              case 'custom':
                sectionName = toKebabCase(displayName);
                break;
              case 'autocomplete':
                sectionName = section.indexSectionName;
                break;
              default:
                sectionName = section.indexSectionName;
                break;
            }

            const recommendationsSection = isRecommendationsSection(section)
              ? section.indexSectionName
              : '';

            return (
              <div key={sectionName} className={\`\${sectionName} \${recommendationsSection}\`}>
                <div {...getSectionProps(section)}>
                  <h5 className='cio-section-name'>{sectionName}</h5>
                  <div className='cio-section-items'>
                    {section?.data?.map((item) => renderItem(item))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
`;

const importHook = `import { useCioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';`;

export const getHookStoryParams = (storyCode) =>
  getStoryParams(storyCode, hooksTemplateCode, importHook);

export const addHookStoryCode = (story, code, description = '') => {
  story.parameters = getHookStoryParams(code);
  story.parameters.docs.description = {
    story: `
${description}

\`\`\`jsx
${code}
\`\`\``,
  };
};
