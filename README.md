# Constructor.io Autocomplete UI Library

## Introduction

This UI Library provides React components that manage fetching and rendering logic for [Constructor.io's autosuggest services](https://constructor.io/products/autosuggest/).

[Our storybook docs](https://constructor-io.github.io/constructorio-ui-autocomplete) are the best place to explore the behavior and configuration options for this UI Library.

![Autosuggest](assets/autosuggest-ui.gif)

## How to use this UI Library
## Install

```bash
npm i @constructor-io/constructorio-ui-autocomplete
```

There are two main methods for consuming this UI Library in a React project:

### Component based

The `CioAutocomplete` component handles state management, data fetching, and rendering logic.

```jsx
import { CioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';

function YourComponent() {
  return (
    <div>
      <CioAutocomplete apiKey="key_Gep3oQOu5IMcNh9A" />
    </div>
  );
```

### Hook based

The `useCioAutocomplete` hook handles state management and data fetching, but leaves rendering logic up to you.

```jsx
import { useCioAutocomplete } from '@constructor-io/constructorio-ui-autocomplete';

function YourComponent() {
  const {
    isOpen,
    sections,
    getFormProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    autocompleteClassName
  } = useCioAutocomplete(args);

  return (
    <div className={autocompleteClassName}>
      <form {...getFormProps()}>
        <label {...getLabelProps()} hidden>
          Search
        </label>
        <input {...getInputProps()} />
      </form>
      <div {...getMenuProps()}>
        {isOpen && (
          <>
            {sections?.map((section) => (
              <div key={section.identifier} className={section.identifier}>
                <div className='cio-section'>
                  <div className='cio-sectionName'>
                    {section?.displayName || section.identifier}
                  </div>
                  <div className='cio-items'>
                    {section?.data?.map((item, index) => (
                      <div
                        {...getItemProps({
                          item,
                          index,
                          sectionIdentifier: section.identifier
                        })}
                        key={item?.data?.id}>
                        <div>
                          {isProduct(item) && (
                            <img
                              width='100%'
                              src={item.data?.image_url}
                              alt=''
                              data-testid='cio-img'
                            />
                          )}
                          <p>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
```

## Custom Styling

### Library defaults

By default, importing react components or hooks from this library does not pull any css into your project.

If you wish to use some starter styles from this library, add an import statement similar to the example import statement below:

```js
import '@constructor-io/constructorio-ui-autocomplete/styles.css';
```

> Note: the path and syntax in this example may change slightly depending on your module bundling strategy

 - These starter styles can be used as a foundation to build on top of, or just as a reference for you to replace completely.
 - To opt out of all default styling, do not import the `styles.css` stylesheet.
 - All starter styles in this library are scoped within the `.cio-autocomplete` css selector.
 - These starter styles are intended to be extended by layering in your own css rules
- If you like, you can override the container's className like so:
`autocompleteClassName='custom-autocomplete-container'`
 - If you like, you can pass additional className(s) of your choosing like so:
`autocompleteClassName='cio-autocomplete custom-autocomplete-container'`

## Troubleshooting

### Known Issues

**ESLint**

There is a known issue with ESLint where it fails to resolve the paths exposed in the `exports` statement of NPM packages. If you are receiving the following error, you can safely disable ESLint using `// eslint-disable-line` for that line.

`Unable to resolve path to module '@constructor-io/constructorio-ui-autocomplete/styles.css'`

Relevant open issues:

[Issue 1868](https://github.com/import-js/eslint-plugin-import/issues/1868)

[Issue 1810](https://github.com/import-js/eslint-plugin-import/issues/1810)


## Local Development

### Development scripts

```bash
npm ci                  # install dependencies for local dev
npm run dev             # start a local dev server for Storybook
npm run lint            # run linter
```

### Maintain Library

```bash
npm run compile           # generate lib folder for publishing to npm
npm run build-storybook   # generate storybook static bundle for deploy with GH Pages
```

## Supporting Docs

- [Storybook 7 Introduction](https://storybook.js.org/docs/7.0/react/get-started/introduction)
- [Typescript Docs](https://www.typescriptlang.org/docs/)
