import React from 'react';
import { createContext, ReactNode } from 'react';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { CioClientOptions } from '../../hooks/useCioClient';
import { AutocompleteResultSections, OnSubmit, ResultsPerSection, SectionOrder } from '../../types';

export type CioAutocompleteProps = CioClientOptions & {
  resultsPerSection?: ResultsPerSection;
  openOnFocus?: boolean;
  onSubmit?: OnSubmit;
  onFocus?: () => void;
  onChange?: () => void;
  placeholder?: string;
  sectionOrder: SectionOrder;
  zeroStateSectionOrder?: SectionOrder;
  zeroStateSections?: AutocompleteResultSections;
  children?: ReactNode;
};

export const CioAutocompleteContext = createContext<ReturnType<typeof useCioAutocomplete>>(
  {} as ReturnType<typeof useCioAutocomplete>
);

export default function CioAutocompleteProvider(props: CioAutocompleteProps) {
  const { children, ...restProps } = props;
  const cioAutoComplete = useCioAutocomplete(restProps);

  return (
    <CioAutocompleteContext.Provider value={{ ...cioAutoComplete }}>
      <div className="cio-autocomplete">{children}</div>
    </CioAutocompleteContext.Provider>
  );
}
