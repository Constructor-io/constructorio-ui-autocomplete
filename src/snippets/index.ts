export const codeSnippet =  `
// Basic Implementation
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" sectionOrder={['products', 'searchSuggestions']}>
  <SearchInput />
  <AutocompleteResults />
</CioAutocomplete>

// With Custom render
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" sectionOrder={['products', 'searchSuggestions']}>
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
      <SectionItemsList sectionName='products' />
      <SectionItemsList
        sectionName='searchSuggestions'
      >
        {({ sectionName, sectionItems }) => (
          <div>
            <h5 className='cio-sectionName'>Search Suggestions</h5>
            <div>
              {sectionItems?.map((item, index) => (
                <SectionItem item={item} index={index} sectionName={'searchSuggestions'}>
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
`
