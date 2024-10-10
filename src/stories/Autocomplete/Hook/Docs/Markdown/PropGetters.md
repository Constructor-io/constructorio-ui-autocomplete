  - #### `getFormProps` \*

    This method should be applied to an element of type `<form>` on the autocomplete input form.

      ```jsx
      const { getFormProps } = useCioAutocomplete(args);

      const ui = (
        <form {...getFormProps()}></form>
      );
      ```


  - #### `getInputProps` \*

    This method should be applied to an element of type `<input>` on the autocomplete input element.

      ```jsx
      const { getInputProps } = useCioAutocomplete(args);

      const ui = (
        <input {...getInputProps()}/>
      );
      ```


  - #### `getLabelProps`

    This method should be applied to an element of type `<label>` on the autocomplete input label element.

      ```jsx
      const { getInputProps, getLabelProps } = useCioAutocomplete(args);

      const ui = (
        <label htmlFor='cio-input' {...getLabelProps()}>
          <input id='cio-input' {...inputProps} />
        </label>
      );
      ```

  - #### `getMenuProps` \*

    This method should be applied to the container element rendering the autocomplete results containers.

      ```jsx
      const { getMenuProps } = useCioAutocomplete(args);

      const ui = (
        <div {...getMenuProps()}>
            <div>Products</div>
            <div>Search Suggestions</div>
        <div/>
      );
      ```


  - #### `getSectionProps` \*

    This method should be applied to the element rendering each autocomplete section.

    It is required to pass a `section` in order to apply the logic.

    - `section`: Section object for the section you are rendering.

      ```jsx
      const { sections, getMenuProps, getSectionProps } = useCioAutocomplete(args);

      const ui = (
        <div {...getMenuProps()}>
          {sections?.map((section) => {
            const { type, displayName } = section;

            return (
            <div {...getSectionProps(section)}>
                <div className='cio-section-items'>
                // List of autocomplete items here
                </div>
            </div>
            );
          })}
        </div>
      );
      ```


  - #### `getItemProps` \*

    This method should be applied to the element rendering each autocomplete section item.

    It is required to pass a `item` in order to apply the logic.

    - `item`: item object for the item you are rendering.

      ```jsx
      const { getMenuProps, section, getSectionProps, getItemProps } = useCioAutocomplete(args);

      const ui = (
        <div {...getMenuProps()}>
          {sections?.map((section) => {
            const { type, displayName } = section;

            return (
            <div {...getSectionProps(section)}>
                <div className='cio-section-items'>
                {section?.data?.map((item) => {
                    return (
                    <li {...getItemProps(item)}>{item.value}</li>
                    )
                })}
                </div>
            </div>
            );
          })}
        </div>
      );
      ```
