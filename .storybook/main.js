import remarkGfm from 'remark-gfm';

export default {
  stories: [
    '../src/stories/getting-started/**/*.mdx',
    '../src/stories/components/**/*.mdx',
    '../src/stories/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/hooks/**/*.mdx',
    '../src/stories/hooks/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/basic-concepts/**/*.mdx',
    '../src/stories/utils/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false, // Disable docs from essentials since we configure it separately
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
};
