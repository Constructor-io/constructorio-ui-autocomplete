import React from 'react'
import { createContext, ReactNode } from "react";
import useCioAutocomplete from "../../hooks/useCioAutocomplete";
import {
  AutocompleteResultSections,
  GetItemProps,
  RenderDefaultContent,
  UseCioAutocompleteOptions,
  CioAutocompleteProps,
  GetFormProps,
  GetInputProps,
  GetMenuProps,
  GetLabelProps,
  SetQuery,
  SectionOrder,
} from '../../types';

type CioAutocompleteProviderProps = CioAutocompleteProps & {
  children: ReactNode;
}

interface ICioAutocompleteContext {
  sections?: AutocompleteResultSections;
  isOpen?: boolean;
  query?: string;
  sectionOrder: SectionOrder;
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
    resultsPerSection,
    openOnFocus,
    onFocus,
    onSubmit,
    placeholder,
    sectionOrder,
  } = props;

  const cioAutoComplete = useCioAutocomplete({
    apiKey,
    cioJsClient,
    resultsPerSection,
    openOnFocus,
    onFocus,
    onSubmit,
    placeholder,
    sectionOrder,
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
