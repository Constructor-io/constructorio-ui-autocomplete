import type { Meta, StoryObj } from '@storybook/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioAutocomplete, CioAutocompleteProps } from '../../../index';
import { functionStrings, stringifyWithDefaults } from '../../../utils';
import { ComponentTemplate, FullExampleTemplate, addComponentStoryDescription } from '.';
import {
  fullFeaturedAndStyledExampleDescription,
  apiKeyDescription,
  cioJsClientDescription,
  componentDescription,
  placeholderDescription,
  customStylesDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  cioJsClientOptionsDescription,
} from '../../../constants';

const meta: Meta<typeof CioAutocomplete> = {
  title: 'Autocomplete/Component',
  component: CioAutocomplete,
  parameters: {
    docs: {
      description: {
        component: componentDescription,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CioAutocomplete>;

let autocompleteClassName = 'cio-autocomplete full-example-autocomplete-styles';

export const FullFeaturedAndStyledExample: Story = {
  render: FullExampleTemplate,
};
FullFeaturedAndStyledExample.args = {
  apiKey,
  onSubmit,
  autocompleteClassName,
  placeholder: 'What can we help you find?',
  advancedParameters: {
    displaySearchSuggestionImages: true,
    displaySearchSuggestionResultCounts: true,
    numTermsWithGroupSuggestions: 6,
  },
  sections: [
    {
      identifier: 'Search Suggestions',
      numResults: 8,
      displaySearchTermHighlights: true,
    },
    {
      identifier: 'Products',
      numResults: 6,
      displaySearchTermHighlights: true,
    },
  ],
  zeroStateSections: [
    {
      identifier: 'bestsellers',
      type: 'recommendations',
      section: 'Products',
      numResults: 6,
    } as any,
    // Todo: remove as any when this PR is merged https://github.com/Constructor-io/constructorio-ui-autocomplete/pull/112/files
  ],
} as CioAutocompleteProps;
addComponentStoryDescription(
  FullFeaturedAndStyledExample,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(FullFeaturedAndStyledExample.args)}`,
  fullFeaturedAndStyledExampleDescription
);

export const ProvideAPIKey: Story = {
  render: ComponentTemplate,
};
ProvideAPIKey.args = { apiKey, onSubmit };
addComponentStoryDescription(
  ProvideAPIKey,
  `const args = ${stringifyWithDefaults(ProvideAPIKey.args)}`,
  apiKeyDescription
);

const cioJsClient = new ConstructorIOClient({ apiKey });

export const ProvideCIOClientInstance: Story = {
  render: ComponentTemplate,
};
ProvideCIOClientInstance.args = { cioJsClient, onSubmit };
addComponentStoryDescription(
  ProvideCIOClientInstance,
  `
import ConstructorIOClient from "@constructor-io/constructorio-client-javascript";

const cioJsClient = new ConstructorIOClient({ "apiKey": "${apiKey}" });
const args = { cioJsClient, onSubmit: ${functionStrings.onSubmit} };`,
  cioJsClientDescription
);

const cioJsClientOptions = { apiKey, serviceUrl: 'https://ac.cnstrc.com' };

export const ProvideCIOClientOptions: Story = {
  render: ComponentTemplate,
};
ProvideCIOClientOptions.args = { apiKey, cioJsClientOptions, onSubmit };
addComponentStoryDescription(
  ProvideCIOClientOptions,
  `const args = ${stringifyWithDefaults(ProvideCIOClientOptions.args)}`,
  cioJsClientOptionsDescription
);

const placeholder = 'Custom placeholder';

export const ProvideCustomPlaceHolder: Story = {
  render: ComponentTemplate,
};
ProvideCustomPlaceHolder.args = { apiKey, onSubmit, placeholder };
addComponentStoryDescription(
  ProvideCustomPlaceHolder,
  `const args = ${stringifyWithDefaults(ProvideCustomPlaceHolder.args)}`,
  placeholderDescription
);

autocompleteClassName = 'cio-autocomplete custom-autocomplete-styles';

export const ProvideCustomStyles: Story = {
  render: ComponentTemplate,
};
ProvideCustomStyles.args = { apiKey, onSubmit, autocompleteClassName };
addComponentStoryDescription(
  ProvideCustomStyles,
  `import '@constructor-io/constructorio-ui-autocomplete/styles.css';

const args = ${stringifyWithDefaults(ProvideCustomStyles.args)}`,
  customStylesDescription
);
