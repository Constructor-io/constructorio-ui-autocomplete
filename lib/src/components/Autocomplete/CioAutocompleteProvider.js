import { __rest } from 'tslib';
import React from 'react';
import { createContext } from 'react';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
export const CioAutocompleteContext = createContext({});
export default function CioAutocompleteProvider(props) {
  const { children } = props,
    restProps = __rest(props, ['children']);
  const cioAutoComplete = useCioAutocomplete(restProps);
  return React.createElement(
    CioAutocompleteContext.Provider,
    { value: Object.assign({}, cioAutoComplete) },
    React.createElement('div', { className: 'cio-autocomplete' }, children)
  );
}
//# sourceMappingURL=CioAutocompleteProvider.js.map
