<div align="center">
  <img src="https://constructor.com/hubfs/constructor-favicon-2024-1.svg" alt="constructor logo" title="constructor logo" width="220px" height="220px">
  
  <h1>Autocomplete UI</h1>

  <p align="center" style="font-size: 1.2rem;">Lightweight, minimalistic, and fully customizable autocomplete component for fast, accessible, and flexible search experiences with <a href='https://constructor.com/solutions/search'>Constructor.io's autosuggest services</a>. 🚀</p>

[**Read The Docs**](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs)

</div>

<hr />
<div align="center">

![minzipped size](https://img.shields.io/bundlephobia/minzip/@constructor-io/constructorio-ui-autocomplete?color=green&style=flat-square)
[![NPM Version](https://img.shields.io/npm/v/@constructor-io/constructorio-ui-autocomplete?style=flat-square)](https://www.npmjs.com/package/@constructor-io/constructorio-ui-autocomplete)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Constructor-io/constructorio-ui-autocomplete/blob/main/LICENSE)

<img src="assets/autocomplete-ui-demonstration.gif" alt="Autocomplete UI demonstration" height="500">

</div>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## 📌 Table of Contents

- [Features](#features)
- [React](#react)
  - [⚡ Installation & Quick Start](#-installation--quick-start)
- [Shopify](#shopify)
  - [⚡ Installation & Quick Start](#-installation--quick-start-1)
- [Bundle (Vanilla JS)](#bundle-vanilla-js)
  - [⚡ Installation & Quick Start](#-installation--quick-start-2)
- [💡 Code Examples](#-code-examples)
- [🎨 Customization](#-customization)
- [🚀 Advanced Features](#-advanced-features)
- [🛠 Troubleshooting](#-troubleshooting)
- [📖 API Reference](#-api-reference)
- [🔗 Complementary Resources](#-complementary-resources)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- 🔌 Easy Integration – Quickly integrate with your app as a plug-and-play React component
- ⚡ Lightweight & Fast – Tiny bundle size, optimized for speed
- 🎨 Customizable UI – With minmal styles, and supports for custom markup
- ⌨️ Keyboard Navigation – Fully supports accessible keyboard naviagation
- ♿ Accessible (a11y) – Built-in ARIA support for screen readers
- 🛡 Written in TypeScript with type safety


## React

### ⚡ Installation & Quick Start
Install the library

```sh
npm i @constructor-io/constructorio-ui-autocomplete
```

Import and use the `CioAutocomplete` component

```tsx
import { CioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';
import '@constructor-io/constructorio-ui-autocomplete/styles.css';

function YourComponent() {
  return (
    <div>
      <CioAutocomplete
        apiKey="key_M57QS8SMPdLdLx4x"
        onSubmit={(e) => {console.log(e)}}
    </div>
  );
```

## Shopify

### ⚡ Installation & Quick Start

The Constructor autocomplete component is available as part of the [Constructor.io Shopify App](https://apps.shopify.com/constructor-connect)

After installing the app, you can use the Constructor autocomplete component by clicking 'Add Section' in your theme editor and adding the Constructor autocomplete liquid component

![installation gif](./assets/autocomplete-ui-liquid-shopify-demo.gif)

For more in depth instructions, check out the [Shopify documentation](https://docs.constructor.com/docs/integrating-with-constructor-platform-connectors-frontend-connectors-shopify-ui).

## Bundle (Vanilla JS)
This is a framework agnostic method that can be used in any JavaScript project. The CioAutocomplete function provides a simple interface to inject an entire Autocomplete UI into the provided selector. In addition to Autocomplete component props, this function also accepts a selector and includeCSS.

### ⚡ Installation & Quick Start

Install the library

```sh
npm i @constructor-io/constructorio-ui-autocomplete
```

Import and use the `CioAutocomplete` component
```javascript
import CioAutocomplete from '@constructor-io/constructorio-ui-autocomplete/constructorio-ui-autocomplete-bundled';

CioAutocomplete({
  selector: '#autocomplete-container',
  includeCSS: true, // Include the default CSS styles. Defaults to true.
  apiKey: 'key_M57QS8SMPdLdLx4x',
  onSubmit: (submitEvent) => console.dir(submitEvent),
  // ... additional arguments
});
</script>
```

## 💡 Code Examples

Ready-to-use, copy-paste examples with explanations.

- [Full Featured example](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs#full-featured-and-styled-example)
- [Render Search Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-sections--docs#render-search-suggestions)
- [Render Product Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-sections--docs#render-suggested-products)

🔹 For more examples check the [full examples](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs)

## 🎨 Customization

CSS styles are not imported by default. Add this to your code to import basic styles

```tsx
import '@constructor-io/constructorio-ui-autocomplete/styles.css';
```

All styles are scoped under .cio-autocomplete. You can extend them by targeting that selector.

```css
/* Custom Style Sheet */
.cio-autocomplete .cio-submit-btn {
  border-radius: 10px;
  border: 1px solid red;
}
```

If you'd like to override or extend the base `className`, you can do so with the `autocompleteClassName` argument

```tsx
import { CioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';
import '@constructor-io/constructorio-ui-autocomplete/styles.css';

function YourComponent() {
  return (
    <div>
      <CioAutocomplete
        apiKey="key_M57QS8SMPdLdLx4x"
        onSubmit={(e) => { console.log(e)}}
        autocompleteClassName="cio-autocomplete custom-autocomplete-container"
      />
    </div>
  );
```

Then you can modify styles like so

```css
/* Custom Style Sheet */
.cio-autocomplete.custom-autocomplete-styles .cio-input {
  font-weight: bold;
}
```

## 🚀 Advanced Features

- [Terms With Group Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-advanced-parameters--docs#terms-with-group-suggestions)
- [Filtered Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-advanced-parameters--docs#filtered-suggestions)
- [Terms With Images And Counts](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-advanced-parameters--docs#terms-with-images-and-counts)

🔹 For more advanced use cases check the [full documentation](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-advanced-parameters--docs)

## 🛠 Troubleshooting

Common issues and solutions.

<table>
  <thead>
    <tr>
      <th>Problem</th>
      <th>Description</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <td>Older JavaScript environments</td>
          <td>
            The library provides two different builds. CommonJS (cjs) and ECMAScript Modules (mjs)
            <br>
            <br>
            For ECMAScript Modules (mjs) build, the JavaScript version is ESNext which might not be supported by your environment. If that's the case and your environment is using an older Javascript version like ES6 (ES2015), you might get this error.
            <br>
            <br>
            <code>Module parse failed: Unexpected token (15:32) You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file</code>
          </td>
          <td>
            To solve this you can import the CommonJS (cjs) build which supports ES6 (ES2015) syntax:
            <br>
            <br>
            <code>import CioAutocomplete from '@constructor-io/constructorio-ui-autocomplete/cjs'</code>
          </td>
      </tr>
      <tr>
        <td>ESLint</td>
        <td>
          There is a known issue with ESLint where it fails to resolve the paths exposed in the exports statement of NPM packages.
          <br>
          <br>
          For ECMAScript Modules (mjs) build. The Javascript version is ESNext which might not be supported by your environment. If that's the case and your environment is using an older Javascript version like ES6 (ES2015), you might get this error.
          <br>
          <br>
          <code>Unable to resolve path to module '@constructor-io/constructorio-ui-autocomplete/styles.css'</code>
          <br>
          <br>
          Relevant open issues:
          <ul>
            <li><a href='https://github.com/import-js/eslint-plugin-import/issues/1868'>Issue 1868</a>
            <li><a href='https://github.com/import-js/eslint-plugin-import/issues/1810'>Issue 1810</a>
        </td>
        <td>
          If you are receiving the following error, you can safely disable ESLint using <code>// eslint-disable-line</code> for that line.
        </td>
      </tr>
  </tbody>
</table>

💬 Need help? Join our [GitHub Discussions](https://github.com/Constructor-io/constructorio-ui-autocomplete/discussions)

## 📖 API Reference

<!-- TODO: reference the API docs from storybook -->
- Full API docs: Click here

## 🔗 Complementary Resources

- 📖 Full Documentation: [Storybook](https://constructor-io.github.io/constructorio-ui-autocomplete/)
- 📦 JS Client: [SDK Documentation](https://constructor-io.github.io/constructorio-client-javascript/module-autocomplete.html#~getAutocompleteResults)
- 🛒 Shopify App: [App Store Link](https://apps.shopify.com/constructor-connect)
- 🌐 Constructor's REST API: [Autocomplete](https://docs.constructor.com/reference/v1-autocomplete-get-autocomplete-results)

## 🤝 Contributing

1. Fork the repo & create a new branch.
2. Run `npm install` to install dependencies.
3. After making the desired changes, run `npm run tests && npm run lint` locally.
4. Submit a PR for review.

## 📜 License

[MIT License](./LICENSE)

Copyright (c) 2022-present Constructor.io Corporation