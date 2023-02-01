import { AutocompleteSubmitEvent } from './types';

// Autocomplete key index
export const apiKey = 'key_Gep3oQOu5IMcNh9A';

/// //////////////////////////////
// Storybook Folder Descriptions
/// //////////////////////////////

export const componentDescription = `- import \`CioAutocomplete\` to render in your JSX.
- This component handles state management, data fetching, and rendering logic.
- To use this component, an \`apiKey\` or \`cioJsClient\` are required, and an \`onSubmit\` callback must be passed. All other values are optional.
- Use different props to configure the behavior of this component.
- The following stories shows how different props affect the component's behavior

> Note: when we say \`cioJsClient\`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)
`;

export const hookDescription = `- import \`useCioAutocomplete\` and call this custom hook in a functional component.
- This hook handles state management & data fetching, but leaves rendering logic up to you
- To use this hook, an \`apiKey\` or \`cioJsClient\` are required, and an \`onSubmit\` callback must be passed. All other values are optional.
- Pass different options to the \`useCioAutocomplete\` hook to configure behavior.
- The following stories shows how different options affect the hook's behavior

Calling the \`useCioAutocomplete\` hook returns an object with the following keys:

\`\`\`jsx
const {
  // must be used for a hooks integrations
  query: string, // current input field value
  sections: [{...}], // array of sections data to render in menu list,
  getFormProps: () => ({...})), // prop getter for jsx form element
  getLabelProps: () => ({...})), // optional: prop getter for jsx label element
  getInputProps: () => ({...})), // prop getter for jsx input element
  getMenuProps: () => ({...})), // prop getter for jsx element serving as menu container
  getItemProps: () => ({...})), // prop getter for jsx element serving as each result
  isOpen: boolean,

  // available for advanced hooks integration use cases
  openMenu: () => void, // open menu
  closeMenu: () => void, // close menu
  setQuery: () => void, // update the current input field value
  cioJsClient, // instance of constructorio-client-javascript
 } = useCioAutocomplete(args);
\`\`\`

> Note: when we say \`cioJsClient\`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)
`;

/// //////////////////////////////
// Storybook Pages
/// //////////////////////////////

export const sectionsDescription = `- by default, typing a query will fetch data for search suggestions and Products
- to override this, pass an array of sections objects
- the order of the objects in the \`sections\` array determines the order of the results
- each section object must have an \`identifier\`
- each section object can specify a \`type\`
- each section object can override the default \`numResults\` of 8

When no values are passed for the \`sections\` argument, the following defaults are used:

\`\`\`jsx
[
  {
    identifier: 'Search Suggestions',
    type: 'autocomplete',
    numResults: 8
  },
  {
    identifier: 'Products',
    type: 'autocomplete',
    numResults: 8
  }
]
\`\`\`
`;

export const userEventsDescription = `- pass callback functions to respond to user events
- if provided, the onFocus callback function will be called each time the user focuses on the text input field
- if provided, the onChange callback function will be called each time the user changes the value in the text input field
- the onSubmit callback function will be called each time the user submits the form
- the user can submit the form by pressing the enter key in the text input field, clicking a submit button within the form, clicking on a result, or pressing enter while a result is selected

> ⚠️ NOTE ⚠️ Use the Storybook Canvas Actions tab to explore the behavior of all of these \`OnEvent\` callback functions as you interact with our Default User Events example rendered in the Canvas. In the stories below, Storybook Canvas Actions have been disabled to focus on each of these callback functions in isolation. Each of the example callback functions in the stories below log output to the console tab of the browser's developer tools.`;

export const zeroStateDescription = `- when the text input field has no text, we call this zero state
- by default, the autocomplete shows nothing in the menu it's for zero state
- to show zero state results, pass an array of section objects for \`zeroStateSections\`
- when \`zeroStateSections\` has sections, the menu will open on user focus by default
- set \`openOnFocus\` to false, to only show \`zeroStateSections\` after user has typed and then cleared the text input, instead of as soon as the user focuses on the text input
- the order of the objects in the \`zeroStateSections\` array determines the order of the results
- each section object must have an \`identifier\`
- each section object can specify a \`type\`
- each section object can override the default \`numResults\` of 8`;

/// //////////////////////////////
// Storybook Stories
/// //////////////////////////////

export const apiKeyDescription = `Pass an \`apiKey\` to request results from constructor's servers`;
export const cioJsClientDescription = `If you are already using an instance of the \`ConstructorIOClient\`, you can pass a \`cioJsClient\` instead of an \`apiKey\` to request results from constructor's servers

> Note: when we say \`cioJsClient\`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)`;
export const placeholderDescription = `Pass a \`placeholder\` to override the default input field placeholder text shown to users before they start typing their query`;
export const searchSuggestionsDescription = `Override default \`sections\` to only suggest search terms`;
export const productsDescription = `Override default \`sections\` to only suggested products`;
export const contentDescription = `Override default \`sections\` to only suggest content`;
export const numResultsDescription = `Override default \`numResults\` to only suggest 2 products per query`;
export const sectionOrderDescription = `Override default \`numResults\` to suggest products, then terms`;
export const recommendationsDescription = `Use constructor's recommendations service, with \`"type": "recommendations"\``;
export const customSectionDescription = `Use a custom section, by managing and passing your own data, with \`"type": "custom"\` and \`"data":[{...}]\``;
export const onFocusDescription = `Pass an \`onFocus\` callback function to execute some code each time the user applies focus to the text input field`;
export const onChangeDescription = `Pass an \`onChange\` callback function to execute some code each time the user changes the value of the text input field`;
export const onSubmitDescription = `Pass an \`onSubmit\` callback function to execute some code after a user submits the search form.

  Your callback function will be invoked with a submit event containing useful metadata about the submit event:
  - if the user submits the text input:
    - the \`query\` field will provide the value of that input field
  - if the user selects a suggested item from the dropdown list:
    - the \`originalQuery\` field will provide the value of the input field that generated the selected item
    - an \`item\` object with information about the suggestion that the user selected`;
// eslint-disable-next-line no-console
export const onSubmitDefault = (submitEvent: AutocompleteSubmitEvent) => console.dir(submitEvent);
export const zeroStateSectionsDescription = `Use \`zeroStateSections\` to show suggestions after a user applies focus to the search input field and before they start typing a query`;
export const openOnFocusDescription = `Use \`openOnFocus: false\` to show suggestions after a user clears their query, but not when they initially apply focus to the search input field`;
export const multipleSectionsDescription = `Use as many different \`recommendations\` and \`custom\` sections as you'd like and in whatever order you would like!`;

// from .storybook/custom-styles-story.css
export const customStylesDescription = `
By default, importing react components or hooks from this library does not pull any css into your project.

If you wish to use some starter styles from this library, add an import statement similar to the example import statement below:

\`
import 'node_modules/@constructor-io/constructorio-ui-autocomplete/lib/mjs/components/Autocomplete/Autocomplete.css';
\`

<i></i>

- To opt out of all default styling, do not import the \`Autocomplete.css\` stylesheet.
- The path and syntax in the example above may change depending on your module bundling strategy
- These starter styles can be used as a foundation to build on top of, or just as a reference for you to replace completely.
- All starter styles in this library are scoped within the \`.cio-autocomplete\` css selector.
- These starter styles are intended to be extended by layering in your own css rules
- If you like, you can override the container's className like so:
\`autocompleteClassName='custom-autocomplete-container'\`
- If you like, you can pass additional className(s) of your choosing like so:
\`autocompleteClassName='cio-autocomplete custom-autocomplete-container'\`


\`\`\`css
/* Custom Style Sheet */
.cio-autocomplete.custom-autocomplete-styles form {
  height: 44px;
  width: 600px;
  border-radius: 8px;
  background-color: rgb(247, 247, 247);
}

.cio-autocomplete.custom-autocomplete-styles .cio-input {
  font-weight: bold;
}

.cio-autocomplete.custom-autocomplete-styles .cio-form button {
  width: 44px;
}

.cio-autocomplete.custom-autocomplete-styles .cio-clear-btn {
  right: 24px;
}

.cio-autocomplete.custom-autocomplete-styles .cio-sectionName {
  margin: 5px 3px;
}

.cio-autocomplete.custom-autocomplete-styles .cio-results {
  width: 620px;
  max-height: 334px;
  overflow: hidden;
  border-radius: 0px 0px 8px 8px;
  color: rgb(51, 51, 51);
}

.cio-autocomplete.custom-autocomplete-styles .Products p {
  padding: 5px 5px 0;
}
\`\`\`
`;
