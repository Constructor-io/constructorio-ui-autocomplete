import { ReactElement } from 'react';
import { CioAutocompleteProps } from '../CioAutocompleteProvider';
type SearchInputProps = {
  children?: (args: Partial<Omit<CioAutocompleteProps, 'children'>>) => ReactElement;
};
export default function SearchInput(props: SearchInputProps): JSX.Element;
export {};
