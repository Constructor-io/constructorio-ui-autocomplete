import { SectionConfiguration } from '../types';
import { CioAutocompleteProps } from '../components/Autocomplete/CioAutocompleteProvider';
export declare const defaultSections: SectionConfiguration[];
export type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;
declare const useCioAutocomplete: (options: UseCioAutocompleteOptions) => {
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
  setQuery: import('react').Dispatch<import('react').SetStateAction<string>>;
  cioClient: import('@constructor-io/constructorio-client-javascript') | undefined;
};
export default useCioAutocomplete;
