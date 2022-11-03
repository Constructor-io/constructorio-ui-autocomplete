import React from 'react'
import { createContext, ReactNode } from "react";
import useCioAutocomplete from "../../hooks/useCioAutocomplete";
import {
  GetItemProps,
  UseCioAutocompleteOptions,
  CioAutocompleteProps,
  GetFormProps,
  GetInputProps,
  GetMenuProps,
  GetLabelProps,
  SetQuery,
  SectionConfiguration,
} from '../../types';

type CioAutocompleteProviderProps = CioAutocompleteProps & {
  children: ReactNode;
}

interface ICioAutocompleteContext {
  sections?: SectionConfiguration[];
  isOpen?: boolean;
  query?: string;
  getFormProps: GetFormProps;
  getInputProps: GetInputProps;
  getMenuProps: GetMenuProps;
  getItemProps: GetItemProps;
  getLabelProps: GetLabelProps;
  setQuery: SetQuery;
}

export const CioAutocompleteContext = createContext<ICioAutocompleteContext>({} as ICioAutocompleteContext);

export default function CioAutocompleteProvider(props: CioAutocompleteProviderProps) {
  const {
    apiKey,
    cioJsClient,
    openOnFocus,
    onFocus,
    onSubmit,
    placeholder,
    sectionConfigurations,
    zeroStateSectionConfigurations,
  } = props;

  const cioAutoComplete = useCioAutocomplete({
    apiKey,
    cioJsClient,
    openOnFocus,
    onFocus,
    onSubmit,
    placeholder,
    sectionConfigurations,
    zeroStateSectionConfigurations,
  } as UseCioAutocompleteOptions);

  const value = {
    ...cioAutoComplete,
  };

  return (
    <CioAutocompleteContext.Provider value={value}>
      <div className='cio-autocomplete'>{props.children}</div>
    </CioAutocompleteContext.Provider>
  );
}
