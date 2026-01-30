import React from 'react';
import { Title, Description, Stories } from '@storybook/addon-docs';
import './custom-styles-story.css';
import './full-example-styles-story.css';
import './storybook-styles.css';
import '../src/styles.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        ['Introduction', 'Quickstart'],
        'Components',
        ['CioAutocomplete', ['*', 'Examples'], 'AutocompleteResults', 'SearchInput', 'SectionItem', 'SectionItemsList'],
        'Hooks',
        'Basic Concepts',
        'Utils',
      ],
    },
  },
  layout: 'fullscreen',
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { index: -1 }
  },
  docs: {
    toc: {
      headingSelector: 'h2, h3',
      title: 'On this page',
    },
    page: () => (
      <>
        <Title />
        <Description />
        <Stories includePrimary />
      </>
    )
  }
};

export const tags = ['autodocs'];
