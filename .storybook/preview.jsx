import { Title, Description, Stories } from '@storybook/addon-docs';
import './custom-styles-story.css';
import './full-example-styles-story.css';
import './storybook-styles.css';
import '../src/styles.css';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: (a, b) =>
      a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })
  },
  layout: 'fullscreen',
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { index: -1 }
  },
  docs: {
    toc: {
      disable: false,
      headingSelector: 'h3, h4, h5',
      ignoreSelector: '.docs-story h2, .docs-story h3',
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
