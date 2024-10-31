### Provide API Key
Pass an `apiKey` to request results from constructor's servers

```jsx
const args = {
  "apiKey": "key_M57QS8SMPdLdLx4x",
  "onSubmit": (submitEvent) => console.dir(submitEvent)
}
```
---

### Provide CIO Client Instance
If you are already using an instance of the `ConstructorIOClient`, you can pass a `cioJsClient` instead of an `apiKey` to request results from constructor's servers

> Note: when we say `cioJsClient`, we are referring to an instance of the [constructorio-client-javascript](https://www.npmjs.com/package/@constructor-io/constructorio-client-javascript)


```jsx
import ConstructorIOClient from "@constructor-io/constructorio-client-javascript";

const cioJsClient = new ConstructorIOClient({ apiKey: "key_M57QS8SMPdLdLx4x" });
const args = { cioJsClient, onSubmit: (submitEvent) => console.dir(submitEvent) };
```
---


### Provide CIO Client Options
If you don't want to create an instance of the `ConstructorIOClient` but still want to customize some of the options, you can pass a `cioJsClientOptions` object. You can learn more about the possible values [here under the parameters section](https://constructor-io.github.io/constructorio-client-javascript/ConstructorIO.html).

```jsx
const args = {
  "apiKey": "key_M57QS8SMPdLdLx4x",
  "cioJsClientOptions": {
    "serviceUrl": "https://ac.cnstrc.com"
  },
  "onSubmit": (submitEvent) => console.dir(submitEvent)
}
```
---


### Provide Custom Styles
By default, importing react components or hooks from this library does not pull any css into your project.

If you wish to use some starter styles from this library, add an import statement similar to the example import statement below:

`import '@constructor-io/constructorio-ui-autocomplete/styles.css';`

- To opt out of all default styling, do not import the `styles.css` stylesheet.
- The path and syntax in the example above may change depending on your module bundling strategy
- These starter styles can be used as a foundation to build on top of, or just as a reference for you to replace completely.
- All starter styles in this library are scoped within the `.cio-autocomplete` css selector.
- These starter styles are intended to be extended by layering in your own css rules
- If you like, you can override the container's className like so:
`autocompleteClassName='custom-autocomplete-container'`
- If you like, you can pass additional className(s) of your choosing like so:
`autocompleteClassName='cio-autocomplete custom-autocomplete-container'`

```css
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

.cio-autocomplete.custom-autocomplete-styles .cio-section-name {
  margin: 5px 3px;
}

.cio-autocomplete.custom-autocomplete-styles .cio-results {
  width: 620px;
  max-height: 334px;
  overflow: hidden;
  border-radius: 0px 0px 8px 8px;
  color: rgb(51, 51, 51);
}

.cio-autocomplete.custom-autocomplete-styles .products p {
  padding: 5px 5px 0;
}
```
---


### Full Code Example
Full hook usage example

```jsx
function YourComponent() {
  const {
    isOpen,
    sections,
    getFormProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    setQuery,
    autocompleteClassName,
    advancedParameters,
  } = useCioAutocomplete(args);
  const { displaySearchSuggestionImages, displaySearchSuggestionResultCounts } =
    advancedParameters || {};

  const inputProps = getInputProps();

  const renderItem = (item: Item) => {
    const imageClassName =
      item.section === 'Products' ? 'cio-product-image' : 'cio-suggestion-image';
    const textClassName = item.section === 'Products' ? 'cio-product-text' : 'cio-suggestion-text';
    let displayImage = false;

    if (item.section === 'Products' && item.data?.image_url) {
      displayImage = true;
    }

    if (item.section === 'Search Suggestions') {
      if (displaySearchSuggestionImages && item.data?.image_url) {
        displayImage = true;
      }
    }

    return (
      <div {...getItemProps(item)} key={item?.id}>
        {displayImage && (
          <img
            src={item.data?.image_url}
            alt={item.value}
            className={imageClassName}
            data-testid='cio-img'
          />
        )}
        {item.groupName ? (
          <p className='cio-term-in-group'>in {item.groupName}</p>
        ) : (
          <p className={textClassName}>{item.value}</p>
        )}
        {displaySearchSuggestionResultCounts && item.data?.total_num_results && (
          <p className='cio-suggestion-count'>({item.data?.total_num_results})</p>
        )}
      </div>
    );
  };

  return (
    <div className={autocompleteClassName}>
      <form {...getFormProps()}>
        <label htmlFor='cio-input' {...getLabelProps()}>
          <input id='cio-input' {...inputProps} />
        </label>
        <button
          className='cio-clear-btn'
          data-testid='cio-clear-btn'
          hidden={!inputProps.value}
          onClick={() => {
            setQuery('');
            if (inputProps.id) {
              setTimeout(() => document.getElementById(inputProps.id)?.focus(), 100);
            }
          }}
          type='button'
          aria-label='Clear search field text'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z' />
            </svg>
          </div>
        </button>
        <button
          className='cio-submit-btn'
          data-testid='cio-submit-btn'
          disabled={!inputProps.value}
          type='submit'
          aria-label='Submit Search'>
          <div className='cio-icon'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
            </svg>
          </div>
        </button>
      </form>
      <div {...getMenuProps()}>
        {isOpen &&
          sections?.map((section) => {
            if (!section?.data?.length) {
              return null;
            }

            const { type, displayName } = section;
            let sectionTitle: string;

            switch (type) {
              case 'recommendations':
                sectionTitle = section.podId;
                break;
              case 'custom':
                sectionTitle = displayName;
                break;
              case 'autocomplete':
                sectionTitle = section.indexSectionName;
                break;
              default:
                sectionTitle = section.indexSectionName;
                break;
            }

            if (displayName) {
              sectionTitle = displayName;
            }

            let sectionClassNames = toKebabCase(sectionTitle);
            if (isRecommendationsSection(section)) {
              sectionClassNames += ` ${toKebabCase(section.indexSectionName)}`;
            }

            return (
              <div key={sectionTitle} className={sectionClassNames}>
                <div {...getSectionProps(section)}>
                  <h5 className='cio-section-name'>{camelToStartCase(sectionTitle)}</h5>
                  <div className='cio-section-items'>
                    {section?.data?.map((item) => renderItem(item))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
```
