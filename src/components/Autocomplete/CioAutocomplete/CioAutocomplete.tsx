import React from 'react'
import CioAutocompleteProvider from '../CioAutocompleteProvider';
import AutocompleteResults from '../AutocompleteResults/AutocompleteResults';
import SearchInput from '../SearchInput/SearchInput';
import { CioAutocompleteProps } from '../../../types';

export default function CioAutocomplete(props: CioAutocompleteProps) {
  const { renderInput, children } = props;

  if (children) {
    return (
      <CioAutocompleteProvider {...props}>
        {children}
      </CioAutocompleteProvider>
    );
  }

  return (
    <div>
      <CioAutocompleteProvider {...props}>
        <SearchInput renderInput={renderInput} />
        <AutocompleteResults />
      </CioAutocompleteProvider>
    </div>
  );
}
