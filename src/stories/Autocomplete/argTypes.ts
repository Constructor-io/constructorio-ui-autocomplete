// eslint-disable-next-line
export const argTypes = {
  placeholder: {
    description: 'Search input placeholder',
    table: {
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  apiKey: {
    type: { name: 'string' },
    description: 'Your constructor API key. Either `apiKey` or `cioJsClient` are required',
    table: {
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
  },
  cioJsClient: {
    description:
      'Optional custom constructor instance. Either `apiKey` or `cioJsClient` are required',
  },
  onSubmit: {
    type: {
      name: 'function',
    },
    description: `On search submit callback function`,
    table: {
      type: {
        summary: 'Function',
      },
    },
    control: null,
  },
  onFocus: {
    type: {
      name: 'function',
    },
    description: `On focus callback function`,
    table: {
      type: {
        summary: 'Function',
      },
    },
    control: null,
  },
  openOnFocus: {
    description: 'Open results on focus',
    table: {
      type: {
        summary: 'boolean',
      },
    },
    control: {
      type: 'boolean',
    },
  },
};
