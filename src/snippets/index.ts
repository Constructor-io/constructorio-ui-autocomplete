export const codeSnippet = `
// Basic Implementation
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO">
  <SearchInput />
  <AutocompleteResults />
</CioAutocomplete>

// With Custom render
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" >
  <SearchInput>
    {
      ({ getFormProps, getInputProps, getLabelProps }) => {
        const { onSubmit, ...formProps } = getFormProps();
        return (
          <form {...formProps} onSubmit={handleSubmit(onSubmit)} style={{ height: 50, width: 600 }}>
            <label {...getLabelProps()} hidden>
              Search Products
            </label>
            <input {...getInputProps()} style={{ borderRadius: 10, padding: 10, height: 30, fontSize: '1.5rem' }} />
          </form>
        );
      }
    }
  </SearchInput>
  <AutocompleteResults>
    <>
      <SectionItemsList sectionIdentifier='products' />
      <SectionItemsList
        sectionIdentifier='searchSuggestions'
      >
        {({ sectionIdentifier, sectionItems }) => (
          <div>
            <h5 className='cio-sectionName'>Search Suggestions</h5>
            <div>
              {sectionItems?.map((item, index) => (
                <SectionItem item={item} index={index} sectionIdentifier={'searchSuggestions'}>
                  <div>
                    {item.value}
                  </div>
                </SectionItem>
              ))}
            </div>
          </div>
        )}
      </SectionItemsList>
    </>
  </AutocompleteResults>
</CioAutocomplete>
`;
