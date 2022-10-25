export const argTypes = {
  placeholder: {
    description: 'Search input placeholder',
    table: {
      type: {
        summary: 'string'
      }
    },
    control: {
      type: 'text'
    },
    defaultValue: 'What can we help you find today?'
  },
  apiKey: {
    type: { name: 'string', required: true },
    description: 'Your constructor API key',
    table: {
      type: {
        summary: 'string'
      }
    },
    control: {
      type: 'text'
    }
  },
  sectionOrder: {
    type: {
      name: 'function',
      required: true
    },
    description: `The order of the rendered sections. If not specified the order of sections will render in an unexpected order`,
    table: {
      type: {
        summary: 'array'
      }
    },
    control: {
      type: 'array'
    }
  },
  onSubmit: {
    type: {
      name: 'function'
    },
    description: `On search submit callback function`,
    table: {
      type: {
        summary: 'Function'
      }
    },
    control: null
  },
  onFocus: {
    type: {
      name: 'function'
    },
    description: `On focus callback function`,
    table: {
      type: {
        summary: 'Function'
      }
    },
    control: null
  },
  openOnFocus: {
    description: 'Open results on focus',
    table: {
      type: {
        summary: 'boolean'
      }
    },
    control: {
      type: 'boolean'
    },
    defaultValue: false
  }
};
