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
