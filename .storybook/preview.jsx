import { Title, Description, Stories } from '@storybook/addon-docs';
import './custom-story-styles.css';

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
    page: () => (
      <>
        <Title />
        <Description />
        <Stories />
      </>
    )
  }
};
