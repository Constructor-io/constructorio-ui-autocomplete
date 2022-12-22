# Constructor.io Autocomplete UI Library

## Introduction

This UI Library provides React components that manage fetching and rendering logic for [Constructor.io's autocomplete services](https://constructor.io/products/autosuggest/).

[Our storybook docs](https://constructor-io.github.io/cio-autocomplete-ts) are the best place to explore the behavior and configuration options for this UI Library.

![Autocomplete](docs-images/autocomplete.png)


## How to use this UI Library

There are two main methods for consuming this UI Library in a React project:

### Component based

The `CioAutocomplete` component handles state management, data fetching, and rendering logic.

```jsx
import { CioAutocomplete } from 'cio-autocomplete-ts';

function YourComponent() {
  return (
    <div>
      <CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" />
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
    getItemProps
  } = useCioAutocomplete(args);

  return (
    <div className='cio-autocomplete'>
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

## Local Development

### Development scripts

```bash
npm ci                  # install dependencies for local dev
npm run storybook       # start a local dev server for Storybook
npm run lint            # run linter
```

### Maintain Library

```bash
npm run bundle            # generate library bundle ready for publishing
npm run build-storybook   # generate storybook bundled static page that can be deployed
```

## Supporting Docs

- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Typescript Docs](https://www.typescriptlang.org/docs/)
- [Rollup](https://www.npmjs.com/package/rollup)
- [API Extractor](https://api-extractor.com/)
