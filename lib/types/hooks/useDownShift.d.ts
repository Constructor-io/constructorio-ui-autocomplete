/// <reference types="react" />
import { UseComboboxReturnValue } from 'downshift';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Item, OnSubmit } from '../types';
type UseDownShiftOptions = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onSubmit?: OnSubmit;
  previousQuery?: string;
  cioClient?: ConstructorIOClient;
  onChange?: (string: any) => void;
};
export type DownShift = UseComboboxReturnValue<Item>;
type UseDownShift = (options: UseDownShiftOptions) => DownShift;
declare const useDownShift: UseDownShift;
export default useDownShift;
