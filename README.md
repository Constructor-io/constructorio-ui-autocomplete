# Constructor.io Autocomplete UI Library

## Introduction

This UI Library provides React components that manage fetching and rendering logic for [Constructor.io's autocomplete services](https://constructor.io/products/autosuggest/).

[Our storybook docs](https://constructor-io.github.io/cio-autocomplete-ts) are the best place to explore the behavior and configuration options for this UI Library.

![Autocomplete](assets/autosuggest-ui.gif)

## How to use this UI Library

There are two main methods for consuming this UI Library in a React project:

### Component based

The `CioAutocomplete` component handles state management, data fetching, and rendering logic.

```jsx
import { CioAutocomplete } from 'cio-autocomplete-ts';

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
import { useCioAutocomplete } from 'cio-autocomplete-ts';

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

This library provides some default styles. These default styles can be used as a foundation to build on top of or just as a reference for you to replace completely. All default styles in this library are scoped within the `.cio-autocomplete` css selector.

 - If you would like to remove all default styling, simply pass an empty string or your own custom autocomplete container className as the value for the `autocompleteClassName` option
 - If you would like to layer your own custom styles on top of the library default styles, you can do so by passing additional className(s) of your choosing `autocompleteClassName='cio-autocomplete custom-autocomplete-container'`

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
