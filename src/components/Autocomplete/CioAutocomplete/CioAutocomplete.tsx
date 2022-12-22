import React from 'react';
import CioAutocompleteProvider, { CioAutocompleteProps } from '../CioAutocompleteProvider';
import AutocompleteResults from '../AutocompleteResults/AutocompleteResults';
import SearchInput from '../SearchInput/SearchInput';
import '../Autocomplete.css';

export default function CioAutocomplete(props: CioAutocompleteProps) {
  const { children } = props;

  if (children) {
    return <CioAutocompleteProvider {...props}>{children}</CioAutocompleteProvider>;
  }

  return (
    <div>
      <CioAutocompleteProvider {...props}>
        <SearchInput />
        <AutocompleteResults />
      </CioAutocompleteProvider>
    </div>
  );
}
