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

## Features

- 🔌 Easy Integration – Quickly integrate with your app as a plug-and-play React component
- ⚡ Lightweight & Fast – Tiny bundle size, optimized for speed
- 🎨 Customizable UI – With minmal styles, and supports for custom markup
- ⌨️ Keyboard Navigation – Fully supports accessible keyboard naviagation
- ♿ Accessible (a11y) – Built-in ARIA support for screen readers
- 🛡 Written in TypeScript with type safety

## ⚡ Installation & Quick Start

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
        onSubmit={(e) => { console.log(e)}}
      />
    </div>
  );
```

## 💡 Code Examples

Ready-to-use, copy-paste examples with explanations.

- [Full Featured example](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs#full-featured-and-styled-example)
- [Render Search Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-sections--docs#render-search-suggestions)
- [Render Product Suggestions](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component-sections--docs#render-suggested-products)

🔹 For more examples check the [full examples](https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs)

## Customization

By default, importing react components or hooks from this library does not pull any css into your project. To use some starter styles from this library, add an import statement similar to the example import statement below:

```tsx
import '@constructor-io/constructorio-ui-autocomplete/styles.css';
```

All the included styles in this library are scoped within the `.cio-autocomplete` css selector, so you can extend existing styles by adding styles to it.

```css
/* Custom Style Sheet */
.cio-autocomplete .cio-submit-btn {
  border-radius: 10px;
  border: 1px solid red;
}

.cio-autocomplete .cio-submit-btn:hover {
  border-radius: 10px;
  border: 1px solid blue;
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
