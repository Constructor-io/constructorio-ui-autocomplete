export const componentDescription = `- import \`CioAutocomplete\` to render in your JSX.
- This component handles state management, data fetching, and rendering logic.
- To use this component, an \`apiKey\` or \`cioJsClient\` are required, all other values are optional.
- Use different props to configure the behavior of this component.
- The following stories shows how different props affect the component's behavior
`;

export const hookDescription = `- import \`useCioAutocomplete\` and call this custom hook in a functional component.
- This hook handles state management & data fetching, but leaves rendering logic up to you
- To use this hook, an \`apiKey\` or \`cioJsClient\` are required, all other values are optional.
- Pass different options to the \`useCioAutocomplete\` hook to configure behavior.
- The following stories shows how different options affect the hook's behavior
`;

export const sectionsDescription = `- by default, typing a query will fetch data for search suggestions and Products
- to override this, pass a an array of sections objects
- the order of the objects in the \`sections\` array determines the order of the results
- each section object must have an \`identifier\`
- each section object can specify a \`type\`
- each section object can override the default \`numResults\` of 8`;

export const userEventsDescription = `- pass callback functions to respond to user events
- if provided, the onFocus callback function will be called each time the user focuses on the text input field
- if provided, the onChange callback function will be called each time the user changes the value in the text input field
- if provided, the onSubmit callback function will be called each time the user submits the form
- the user can submit the form by pressing the enter key in the text input field, clicking a submit button within the form, clicking on a result, or pressing enter while a result is selected`;

export const zeroStateDescription = `- when the text input field has no text, we call this zero state
- by default, the autocomplete shows nothing in the menu it's for zero state
- to show zero state results, pass an array of section objects for \`zeroStateSections\`
- when \`zeroStateSections\` has sections, the menu will open on user focus by default
- set \`openOnFocus\` to false, to only show \`zeroStateSections\` after user has typed and then cleared the text input, instead of as soon as the user focuses on the text input
- the order of the objects in the \`zeroStateSections\` array determines the order of the results
- each section object must have an \`identifier\`
- each section object can specify a \`type\`
- each section object can override the default \`numResults\` of 8`;
