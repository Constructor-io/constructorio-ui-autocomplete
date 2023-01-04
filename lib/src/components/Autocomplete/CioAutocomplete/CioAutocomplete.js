import React from 'react';
import CioAutocompleteProvider from '../CioAutocompleteProvider';
import AutocompleteResults from '../AutocompleteResults/AutocompleteResults';
import SearchInput from '../SearchInput/SearchInput';
import '../Autocomplete.css';
export default function CioAutocomplete(props) {
  const { children } = props;
  if (children) {
    return React.createElement(CioAutocompleteProvider, Object.assign({}, props), children);
  }
  return React.createElement(
    'div',
    null,
    React.createElement(
      CioAutocompleteProvider,
      Object.assign({}, props),
      React.createElement(SearchInput, null),
      React.createElement(AutocompleteResults, null)
    )
  );
}
//# sourceMappingURL=CioAutocomplete.js.map
