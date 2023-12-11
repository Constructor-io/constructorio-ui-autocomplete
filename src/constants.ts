import { AutocompleteSubmitEvent } from './types';

// Autocomplete key index
export const apiKey = 'key_M57QS8SMPdLdLx4x';

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
- This hook leaves rendering logic up to you, while handling:
  - state management
  - data fetching
  - keyboard navigation
  - mouse interactions
  - focus and submit event handling
- To use this hook, an \`apiKey\` or \`cioJsClient\` are required, and an \`onSubmit\` callback must be passed to the \`useCioAutocomplete\` hook to configure behavior. All other values are optional.
- use the <a href="https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters" target="__blank">prop getters</a> and other variables returned by this hook (below) to leverage the functionality described above with jsx elements in your react component definitions

Calling the \`useCioAutocomplete\` hook returns an object with the following keys:

\`\`\`jsx
const {
  // must be used for a hooks integrations
  query: string, // current input field value
  sections: [{...}], // array of sections data to render in menu list
  getFormProps: () => ({...})), // prop getter for jsx form element
  getInputProps: () => ({...})), // prop getter for jsx input element
  getMenuProps: () => ({...})), // prop getter for jsx element rendering the results container
  getItemProps: (item) => ({...})), // prop getter for jsx element rendering each result

  // available for use, but not required for all use cases
  selectedItem: item, // undefined or current selected item (via hover or arrow keys)
  isOpen: boolean, // current state of the menu list
  openMenu: () => void, // open menu
  closeMenu: () => void, // close menu
  setQuery: () => void, // update the current input field value
  getLabelProps: () => ({...})), // prop getter for a jsx label element
  cioJsClient, // instance of constructorio-client-javascript
 } = useCioAutocomplete(args);
\`\`\`

> Note: when we say \`cioJsClient\`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)

The following stories show how different options affect the hook's behavior!
`;

/// //////////////////////////////
// Storybook Pages
/// //////////////////////////////

export const sectionsDescription = `- by default, typing a query will fetch data for Search Suggestions and Products
- to override this, pass an array of sections objects
- the order of the objects in the \`sections\` array determines the order of the results
- each autocomplete section object must have a \`sectionIndex\`
- each recommendation section object must have a \`podId\`
- each custom section object must have a \`displayName\`
- each section object can specify a \`type\`
- each section object can override the default \`numResults\` of 8

When no values are passed for the \`sections\` argument, the following defaults are used:

\`\`\`jsx
[
  {
    indexSection: 'Search Suggestions',
    type: 'autocomplete',
    numResults: 8
  },
  {
    indexSection: 'Products',
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

export const fullFeaturedAndStyledExampleDescription = `Using the default options, the library displays clean and minimal visual elements, with the intent of making it easy for consumers to easily extend and customize the styles to suit unique needs. The example below shows a full featured and styled example to demonstrate what is possible using Constructor.io's advanced Autocomplete UI library.`;

export const apiKeyDescription = `Pass an \`apiKey\` to request results from constructor's servers`;
export const cioJsClientDescription = `If you are already using an instance of the \`ConstructorIOClient\`, you can pass a \`cioJsClient\` instead of an \`apiKey\` to request results from constructor's servers

> Note: when we say \`cioJsClient\`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)`;
export const cioJsClientOptionsDescription = `If you don't want to create an instance of the \`ConstructorIOClient\` but still want to customize some of the options, you can pass a \`cioJsClientOptions\` object. You can learn more about the possible values [here under the parameters section](https://constructor-io.github.io/constructorio-client-javascript/ConstructorIO.html).`;
export const placeholderDescription = `Pass a \`placeholder\` to override the default input field placeholder text shown to users before they start typing their query`;
export const searchSuggestionsDescription = `Override default \`sections\` to only suggest search terms`;
export const productsDescription = `Override default \`sections\` to only suggested products`;
export const contentDescription = `Override default \`sections\` to only suggest content`;
export const numResultsDescription = `Override default \`numResults\` to only suggest 2 products per query`;
export const sectionOrderDescription = `Override default \`numResults\` to suggest products, then terms`;
export const recommendationsDescription = `Use constructor's recommendations service, with \`"type": "recommendations"\``;
export const displaySearchTermHighlightsDescription = `Use constructor's auto highlighting of words that match the search keyword, with \`"displaySearchTermHighlights": true\``;
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
import '@constructor-io/constructorio-ui-autocomplete/styles.css';
\`

<i></i>

- To opt out of all default styling, do not import the \`styles.css\` stylesheet.
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

export const advancedParametersDescription = `The stories below show how optional fields within this \`advancedParameters\` object that can be used to fine-tune the autosuggest data returned from constructor's servers.`;

export const advancedParametersDefaultDescription = `Passing an \`advancedParameters\` object is optional. Passing an empty object for the \`advancedParameters\` field behaves the same as not passing an \`advancedParameters\` object at all.`;

export const termsWithGroupSuggestionsDescription = `Pass integers for the \`numTermsWithGroupSuggestions\` and \`numGroupsSuggestedPerTerm\` fields to add suggested group filters to search term suggestions. Not all suggested search terms will have group filters, so these integers are upper limits, used to specify the maximum number of terms with group filters and the maximum number of suggested group filters per term.

To see this in action:
1. Type "pan" in the example below.
  - Notice how the user is presented with a search term of "all week flex pant" as well as "all week flex pant in Chinos" and "all week flex pant baby in Athleisure Pants & Joggers"
2. Navigate to the "Terms With Group Suggestions" story (using the navigation menu to the left)
3. Then use the Controls to adjust the values of \`numTermsWithGroupSuggestions\` to \`3\` and \`numGroupsSuggestedPerTerm\` to \`1\`
4. Next, type "pan" in the example autocomplete input field.
  - Notice how the user is presented with three different search terms that have a maximum of one "in {group}" suggestion each`;

export const filteredSuggestionsDescription = `Pass a \`filters\` object under \`advancedParameters\` to apply filters to the suggestions. Any parameter supported by <a href="https://docs.constructor.io/rest_api/autocomplete_queries/" target="__blank">our autocomplete endpoint</a> can be passed under \`advancedParameters\`.

To see this in action:
1. Type "short" in the example below.
  - Notice how the user is presented with only short pants as results.
  - This is because the results are currently filtered to belong to the "Shorts" group.
2. Navigate to the "Filtered Suggestions" story (using the navigation menu to the left)
3. Then use the Controls to adjust the values of \`"group_id"\` to \`"1030"\`.
4. Next, type "short" in the example autocomplete input field.
  - Notice how the user is presented with only short sleeved items as results.
  - This is because we are filtering to the "Shirts" group`;

export const termsWithImagesAndCountsDescription = `Pass boolean flags for \`displaySearchSuggestionImages\` and \`displaySearchSuggestionResultCounts\` fields to display images and counts for search suggestions. These fields need to be made displayable before they can be used. Please contact your Constructor Integration Engineer for details.`;

export const debounceDescription = `Pass an integer to \`debounce\` to override the recommended, default delay employed for debouncing autocomplete network requests between keystrokes as your users type into the text input field. The default value is 250, which results in a debounce delay of 250 milliseconds.`;
