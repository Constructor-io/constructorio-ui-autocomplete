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

- 📦 A Plug and play React component
- ⚡ Lightweight & Fast – Tiny bundle size, optimized for speed.
- 🎨 Customizable UI – With minimal styles and support for custom markup.
- ⌨️ Keyboard Navigation – Fully supports accessible keyboard naviagation.
- ♿ Accessible (a11y) – Built-in ARIA support for screen readers
- 🛡 Written in TypeScript with type safety.

## Installation & Quick Start
Install the library
```sh
npm i @constructor-io/constructorio-ui-autocomplete
```

Import and use the `CioAutocomplete` component
```ts
import { CioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';
function YourComponent() {
  return (
    <div>
      <CioAutocomplete 
        apiKey="key_M57QS8SMPdLdLx4x"
        onSubmit={(e) => {console.log(e)}}
      />
    </div>
  );
```