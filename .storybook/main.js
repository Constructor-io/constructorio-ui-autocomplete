const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  stories: isProduction
    ? ['../src/**/Autocomplete/**/*.stories.mdx', '../src/**/Autocomplete/**/*.stories.@(js|jsx|ts|tsx)']
    : ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  }
};
