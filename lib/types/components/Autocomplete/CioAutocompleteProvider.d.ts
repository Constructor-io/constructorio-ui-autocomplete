import React from 'react';
import { ReactNode } from 'react';
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
export declare const CioAutocompleteContext: React.Context<{
  query: string;
  sections: SectionConfiguration[];
  isOpen: boolean;
  getMenuProps: () => any;
  getLabelProps: (options?: import('downshift').UseComboboxGetLabelPropsOptions | undefined) => any;
  openMenu: () => void;
  closeMenu: () => void;
  getItemProps: ({
    item,
    index,
    sectionIdentifier
  }: {
    item: any;
    index?: number | undefined;
    sectionIdentifier?: string | undefined;
  }) => any;
  getInputProps: () => any;
  getFormProps: () => {
    onSubmit: (event: any) => {
      query: string;
    };
    className: string;
    'data-testid': string;
  };
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  cioClient: import('@constructor-io/constructorio-client-javascript') | undefined;
}>;
export default function CioAutocompleteProvider(props: CioAutocompleteProps): JSX.Element;
