import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useCioAutocomplete } from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';
import { toKebabCase, camelToStartCase } from '../../../utils/format';
import { isCustomSection, isRecommendationsSection } from '../../../typeGuards';
import { Item, Section } from '../../../types';

// Template component that demonstrates the hook usage
function HooksTemplate(args: Parameters<typeof useCioAutocomplete>[0]) {
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
      <div {...getItemProps(item)} key={item?.data?.variation_id || item?.id}>
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
          hidden={!inputProps.value}
          onClick={() => {
            setQuery('');
            if (inputProps.id) {
              setTimeout(() => document.getElementById(inputProps.id)?.focus(), 100);
            }
          }}
          type='button'
          aria-label='Clear search field text'>
          <div className='cio-icon'>✕</div>
        </button>
        <button
          className='cio-submit-btn'
          disabled={!inputProps.value}
          type='submit'
          aria-label='Submit Search'>
          <div className='cio-icon'>🔍</div>
        </button>
      </form>
      <div {...getMenuProps()}>
        {isOpen &&
          sections?.map((section: Section) => {
            if (!section?.data?.length) return null;

            const { type, displayName } = section;
            const sectionListingType = isCustomSection(section)
              ? 'custom'
              : toKebabCase(section.indexSectionName || section.data[0]?.section || 'Products');

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

            let sectionClassNames = toKebabCase(sectionListingType);
            if (isRecommendationsSection(section)) {
              sectionClassNames += ` ${toKebabCase(section.podId)}`;
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

const meta: Meta<typeof useCioAutocomplete> = {
  title: 'Hooks/useCioAutocomplete',
  component: HooksTemplate,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    apiKey: {
      description: 'Your Constructor.io API key. Either `apiKey` or `cioJsClient` is required.',
      table: { type: { summary: 'string' } },
    },
    onSubmit: {
      description: 'Callback fired when user submits a search or selects an item.',
      table: { type: { summary: '(event: AutocompleteSubmitEvent) => void' } },
    },
    placeholder: {
      description: 'Search input placeholder text.',
      table: { type: { summary: 'string' } },
    },
    sections: {
      description: 'Configure which sections to display.',
      table: { type: { summary: 'UserDefinedSection[]' } },
    },
    zeroStateSections: {
      description: 'Configure sections to display when input is empty.',
      table: { type: { summary: 'UserDefinedSection[]' } },
    },
    openOnFocus: {
      description: 'Open results dropdown when input receives focus.',
      table: { type: { summary: 'boolean' } },
    },
    autocompleteClassName: {
      description: 'CSS class name for the container element.',
      table: { type: { summary: 'string' } },
    },
    advancedParameters: {
      description: 'Advanced configuration options.',
      table: { type: { summary: 'AdvancedParameters' } },
    },
    cioJsClient: {
      description: 'An existing ConstructorIOClient instance.',
      table: { type: { summary: 'ConstructorIOClient' } },
    },
    cioClientOptions: {
      description: 'Options to customize the ConstructorIOClient.',
      table: { type: { summary: 'ConstructorClientOptions' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <HooksTemplate {...args} />,
  args: {
    apiKey,
    onSubmit,
  },
};

export const WithZeroState: Story = {
  render: (args) => <HooksTemplate {...args} />,
  args: {
    apiKey,
    onSubmit,
    zeroStateSections: [
      {
        podId: 'bestsellers',
        type: 'recommendations',
        numResults: 4,
      },
    ],
  },
};
