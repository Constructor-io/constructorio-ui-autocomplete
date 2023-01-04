export declare const componentDescription =
  "- import `CioAutocomplete` to render in your JSX.\n- This component handles state management, data fetching, and rendering logic.\n- To use this component, an `apiKey` or `cioJsClient` are required, all other values are optional.\n- Use different props to configure the behavior of this component.\n- The following stories shows how different props affect the component's behavior\n\n> Note: when we say `cioJsClient`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)\n";
export declare const hookDescription =
  "- import `useCioAutocomplete` and call this custom hook in a functional component.\n- This hook handles state management & data fetching, but leaves rendering logic up to you\n- To use this hook, an `apiKey` or `cioJsClient` are required, all other values are optional.\n- Pass different options to the `useCioAutocomplete` hook to configure behavior.\n- The following stories shows how different options affect the hook's behavior\n\nCalling the `useCioAutocomplete` hook returns an object with the following keys:\n\n```jsx\nconst {\n  // must be used for a hooks integrations\n  query: string, // current input field value\n  sections: [{...}], // array of sections data to render in menu list,\n  getFormProps: () => ({...})), // prop getter for jsx form element\n  getLabelProps: () => ({...})), // optional: prop getter for jsx label element\n  getInputProps: () => ({...})), // prop getter for jsx input element\n  getMenuProps: () => ({...})), // prop getter for jsx element serving as menu container\n  getItemProps: () => ({...})), // prop getter for jsx element serving as each result\n  isOpen: boolean,\n\n  // available for advanced hooks integration use cases\n  openMenu: () => void, // open menu\n  closeMenu: () => void, // close menu\n  setQuery: () => void, // update the current input field value\n  cioJsClient, // instance of constructorio-client-javascript\n } = useCioAutocomplete(args);\n```\n\n> Note: when we say `cioJsClient`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)\n";
export declare const sectionsDescription =
  "- by default, typing a query will fetch data for search suggestions and Products\n- to override this, pass a an array of sections objects\n- the order of the objects in the `sections` array determines the order of the results\n- each section object must have an `identifier`\n- each section object can specify a `type`\n- each section object can override the default `numResults` of 8\n\nWhen no values are passed for the `sections` argument, the following defaults are used:\n\n```jsx\n[\n  {\n    identifier: 'Search Suggestions',\n    type: 'autocomplete',\n    numResults: 8\n  },\n  {\n    identifier: 'Products',\n    type: 'autocomplete',\n    numResults: 8\n  }\n]\n```\n";
export declare const userEventsDescription =
  "- pass callback functions to respond to user events\n- if provided, the onFocus callback function will be called each time the user focuses on the text input field\n- if provided, the onChange callback function will be called each time the user changes the value in the text input field\n- if provided, the onSubmit callback function will be called each time the user submits the form\n- the user can submit the form by pressing the enter key in the text input field, clicking a submit button within the form, clicking on a result, or pressing enter while a result is selected\n\n> \u26A0\uFE0F NOTE \u26A0\uFE0F Use the Storybook Canvas Actions tab to explore the behavior of all of these `OnEvent` callback functions as you interact with our Default User Events example rendered in the Canvas. In the stories below, Storybook Canvas Actions have been disabled to focus on each of these callback functions in isolation. Each of the example callback functions in the stories below log output to the console tab of the browser's developer tools.";
export declare const zeroStateDescription =
  "- when the text input field has no text, we call this zero state\n- by default, the autocomplete shows nothing in the menu it's for zero state\n- to show zero state results, pass an array of section objects for `zeroStateSections`\n- when `zeroStateSections` has sections, the menu will open on user focus by default\n- set `openOnFocus` to false, to only show `zeroStateSections` after user has typed and then cleared the text input, instead of as soon as the user focuses on the text input\n- the order of the objects in the `zeroStateSections` array determines the order of the results\n- each section object must have an `identifier`\n- each section object can specify a `type`\n- each section object can override the default `numResults` of 8";
export declare const apiKeyDescription =
  "Pass an `apiKey` to request results from constructor's servers";
export declare const cioJsClientDescription =
  "If you are already using an instance of the `ConstructorIOClient`, you can pass a `cioJsClient` instead of an `apiKey` to request results from constructor's servers\n\n> Note: when we say `cioJsClient`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)";
export declare const placeholderDescription =
  'Pass a `placeholder` to override the default input field placeholder text shown to users before they start typing their query';
export declare const searchSuggestionsDescription =
  'Override default `sections` to only suggest search terms';
export declare const productsDescription = 'Override default `sections` to only suggested products';
export declare const contentDescription = 'Override default `sections` to only suggest content';
export declare const numResultsDescription =
  'Override default `numResults` to only suggest 2 products per query';
export declare const sectionOrderDescription =
  'Override default `numResults` to suggest products, then terms';
export declare const recommendationsDescription =
  'Use constructor\'s recommendations service, with `"type": "recommendations"`';
export declare const customSectionDescription =
  'Use a custom section, by managing and passing your own data, with `"type": "custom"` and `"data":[{...}]`';
export declare const onFocusDescription =
  'Pass an `onFocus` callback function to execute some code each time the user applies focus to the text input field';
export declare const onChangeDescription =
  'Pass an `onChange` callback function to execute some code each time the user changes the value of the text input field';
export declare const onSubmitDescription =
  'Pass an `onSubmit` callback function to execute some code after a user submits the search form.\n\n  Your callback function will be invoked with a submit event containing useful metadata about the submit event:\n  - if the user submits the text input:\n    - the `query` field will provide the value of that input field\n  - if the user selects a suggested item from the dropdown list:\n    - the `originalQuery` field will provide the value of the input field that generated the selected item\n    - an `item` object with information about the suggestion that the user selected';
export declare const zeroStateSectionsDescription =
  'Use `zeroStateSections` to show suggestions after a user applies focus to the search input field and before they start typing a query';
export declare const openOnFocusDescription =
  'Use `openOnFocus: false` to show suggestions after a user clears their query, but not when they initially apply focus to the search input field';
export declare const multipleSectionsDescription =
  "Use as many different `recommendations` and `custom` sections as you'd like and in whatever order you would like!";
