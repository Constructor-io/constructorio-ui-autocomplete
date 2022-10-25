export const codeSnippet = `
// Basic Implementation
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" sectionOrder={['Products', 'Search Suggestions']}>
  <SearchInput />
  <AutocompleteResults />
</CioAutocomplete>

// With Custom render
<CioAutocomplete apiKey="key_jaqzPcUDnK66puIO" sectionOrder={['Products', 'Search Suggestions']}>
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
      <SectionItemsList sectionName='Products' />
      <SectionItemsList
        sectionName='Search Suggestions'
      >
        {({ sectionName, sectionItems }) => (
          <div>
            <h5 className='cio-sectionName'>Search Suggestions</h5>
            <div>
              {sectionItems?.map((item, index) => (
                <SectionItem item={item} index={index} sectionName={'Search Suggestions'}>
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
