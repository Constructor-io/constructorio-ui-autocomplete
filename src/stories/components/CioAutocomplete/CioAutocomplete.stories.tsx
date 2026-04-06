import React from 'react';
import type { StoryObj } from '@storybook/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete, CioAutocompleteProps } from '../../../index';
import { apiKey, onSubmitDefault as onSubmit } from '../../../constants';

// Using CioAutocompleteProps directly due to discriminated union type
const meta = {
  title: 'Components/CioAutocomplete',
  component: CioAutocomplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    apiKey: {
      description: 'Your Constructor.io API key. Either `apiKey` or `cioJsClient` is required.',
      table: { type: { summary: 'string' } },
      control: { type: 'text' },
    },
    onSubmit: {
      description:
        'Callback fired when user submits a search or selects an item. Receives an `AutocompleteSubmitEvent`.',
      table: { type: { summary: '(event: AutocompleteSubmitEvent) => void' } },
    },
    placeholder: {
      description: 'Search input placeholder text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'What can we help you find today?' },
      },
      control: { type: 'text' },
    },
    sections: {
      description:
        'Configure which sections to display (Products, Search Suggestions, Recommendations, Custom).',
      table: { type: { summary: 'UserDefinedSection[]' } },
    },
    zeroStateSections: {
      description: 'Configure sections to display when input is empty (zero state).',
      table: { type: { summary: 'UserDefinedSection[]' } },
    },
    openOnFocus: {
      description: 'Open results dropdown when input receives focus.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      control: { type: 'boolean' },
    },
    autocompleteClassName: {
      description: 'CSS class name for the container element.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'cio-autocomplete' } },
      control: { type: 'text' },
    },
    advancedParameters: {
      description: 'Advanced configuration options for the autocomplete API.',
      table: { type: { summary: 'AdvancedParameters' } },
    },
    cioJsClient: {
      description:
        'An existing ConstructorIOClient instance. Use instead of `apiKey` if you already have one.',
      table: { type: { summary: 'ConstructorIOClient' } },
    },
    cioClientOptions: {
      description:
        'Options to customize the ConstructorIOClient without creating your own instance.',
      table: { type: { summary: 'ConstructorClientOptions' } },
    },
    useShopifyDefaults: {
      description: 'Enable Shopify-specific defaults for navigation and submit behavior.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: { type: 'boolean' },
    },
    shopifySettings: {
      description: 'Shopify-specific settings. Used when `useShopifyDefaults` is enabled.',
      table: { type: { summary: 'ShopifySettings' } },
    },
    onFocus: {
      description: 'Callback fired when input receives focus.',
      table: { type: { summary: '() => void' } },
    },
    onChange: {
      description: 'Callback fired when input value changes.',
      table: { type: { summary: '(input: string) => void' } },
    },
    defaultInput: {
      description: 'Default value for the search input.',
      table: { type: { summary: 'string' } },
      control: { type: 'text' },
    },
    children: {
      description: 'Custom children using render props pattern.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<CioAutocompleteProps>;

export const Primary: Story = {
  render: (args: CioAutocompleteProps) => <CioAutocomplete {...args} />,
  args: {
    apiKey,
    onSubmit,
  },
};

export const WithCustomStyles: Story = {
  render: (args: CioAutocompleteProps) => <CioAutocomplete {...args} />,
  args: {
    apiKey,
    onSubmit,
    autocompleteClassName: 'cio-autocomplete custom-autocomplete-styles',
  },
};

export const WithCioClient: Story = {
  render: (args: CioAutocompleteProps) => {
    const cioJsClient = new ConstructorIOClient({ apiKey });
    return <CioAutocomplete {...args} cioJsClient={cioJsClient} />;
  },
  args: {
    onSubmit,
  },
};

export const FullFeatured: Story = {
  render: (args: CioAutocompleteProps) => (
    <div className='cio-autocomplete full-example-autocomplete-styles header'>
      <CioAutocomplete {...args} />
    </div>
  ),
  args: {
    apiKey,
    onSubmit,
    autocompleteClassName: 'cio-autocomplete full-example-autocomplete-styles',
    placeholder: 'What can we help you find?',
    advancedParameters: {
      displaySearchSuggestionImages: true,
      displaySearchSuggestionResultCounts: true,
      numTermsWithGroupSuggestions: 6,
    },
    sections: [
      {
        indexSectionName: 'Search Suggestions',
        numResults: 8,
        displaySearchTermHighlights: true,
      },
      {
        indexSectionName: 'Products',
        numResults: 6,
        displaySearchTermHighlights: true,
      },
    ],
    zeroStateSections: [
      {
        podId: 'bestsellers',
        type: 'recommendations',
        numResults: 6,
      },
    ],
  },
};
