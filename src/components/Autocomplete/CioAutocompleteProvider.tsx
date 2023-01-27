import React, { createContext } from 'react';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { CioAutocompleteProps } from '../../types';

export const CioAutocompleteContext = createContext<ReturnType<typeof useCioAutocomplete>>(
  {} as ReturnType<typeof useCioAutocomplete>
);

export default function CioAutocompleteProvider(props: CioAutocompleteProps) {
  const { children, ...restProps } = props;
  const cioAutocomplete = useCioAutocomplete(restProps);

  return (
    <CioAutocompleteContext.Provider value={cioAutocomplete}>
      <div className={cioAutocomplete.autocompleteClassName}>{children}</div>
    </CioAutocompleteContext.Provider>
  );
}
