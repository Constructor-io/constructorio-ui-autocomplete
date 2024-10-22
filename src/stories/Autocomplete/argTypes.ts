// eslint-disable-next-line
export const argTypes = {
  apiKey: {
    description: 'Your constructor API key. Either `apiKey` or `cioJsClient` are required',
    control: {
      type: 'text',
    },
  },
  cioJsClient: {
    description:
      'Optional custom constructor instance. Either `apiKey` or `cioJsClient` are required',
  },
  cioJsClientOptions: {
    description:
      "If you don't want to create an instance of the `ConstructorIOClient` but still want to customize some of the options, you can pass a `cioJsClientOptions` object. You can learn more about the possible values [here under the parameters section](https://constructor-io.github.io/constructorio-client-javascript/ConstructorIO.html)",
  },
  defaultInput: {
    description: 'Search input default value',
    control: {
      type: 'text',
    },
  },
  placeholder: {
    description: 'Search input placeholder',
    control: {
      type: 'text',
    },
  },
  onSubmit: {
    description: `On search submit callback function`,
    control: null,
  },
  onFocus: {
    description: `On Input focus callback function`,
    control: null,
  },
  openOnFocus: {
    description:
      'Use `openOnFocus: false` to show suggestions after a user clears their query, but not when they initially apply focus to the search input field',
    control: {
      type: 'boolean',
    },
    defaultValue: {
      summary: 'true',
    },
  },
  sections: {
    description:
      'by default, typing a query will fetch data for Search Suggestions and Products to override this, pass an array of sections objects',
    control: {
      type: 'array',
    },
  },
  zeroStateSections: {
    description:
      'Use `zeroStateSections` to show suggestions after a user applies focus to the search input field and before they start typing a query',
    control: {
      type: 'array',
    },
  },
  autocompleteClassName: {
    description: "Overrides the container's className",
    control: {
      type: 'text',
    },
  },
  advancedParameters: {
    description: 'Extra config parameters',
    control: {
      type: 'text',
    },
  },
};

export const storiesControls = {
  include: ['apiKey', 'defaultInput', 'placeholder', 'autocompleteClassName'],
};
