import React from 'react';
import { createContext, ReactNode } from 'react';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { CioClientConfig } from '../../hooks/useCioClient';
import { OnSubmit, SectionConfiguration } from '../../types';

export type CioAutocompleteProps = CioClientConfig & {
  openOnFocus?: boolean;
  onSubmit?: OnSubmit;
  onFocus?: () => void;
  onChange?: () => void;
  placeholder?: string;
  children?: ReactNode;
  sections?: SectionConfiguration[];
  zeroStateSections?: SectionConfiguration[];
};

export const CioAutocompleteContext = createContext<ReturnType<typeof useCioAutocomplete>>(
  {} as ReturnType<typeof useCioAutocomplete>
);

export default function CioAutocompleteProvider(props: CioAutocompleteProps) {
  const { children, ...restProps } = props;
  const cioAutoComplete = useCioAutocomplete(restProps);

  return (
    <CioAutocompleteContext.Provider value={{ ...cioAutoComplete }}>
      <div className='cio-autocomplete'>{children}</div>
    </CioAutocompleteContext.Provider>
  );
}
