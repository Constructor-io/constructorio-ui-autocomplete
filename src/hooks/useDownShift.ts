import { useCombobox, UseComboboxReturnValue } from 'downshift';
import { Item, OnSubmit } from '../types';
import { CioClient } from './useCioClient';

type UseDownShiftOptions = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onSubmit?: OnSubmit;
  previousQuery?: string;
  cioClient?: CioClient;
  onChange?: () => void;
};

export type DownShift = UseComboboxReturnValue<Item>;

type UseDownShift = (options: UseDownShiftOptions) => DownShift;

const useDownShift: UseDownShift = ({
  setQuery,
  items,
  onSubmit,
  cioClient,
  previousQuery = '',
  onChange
}) => {
  return useCombobox({
    items,
    itemToString: (item) => (item ? item.value : ''),
    onInputValueChange: async ({ inputValue = '' }) => {
      setQuery(inputValue);
      if (onChange) {
        onChange();
      }
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        setQuery(selectedItem.value);
        if (onSubmit && selectedItem?.value) {
          onSubmit({ item: selectedItem, originalQuery: previousQuery });
        }
        if (selectedItem?.value) {
          if (!selectedItem?.data?.url) {
            cioClient?.tracker.trackSearchSubmit(selectedItem.value, {
              original_query: previousQuery
            });
          }
          cioClient?.tracker.trackAutocompleteSelect(selectedItem.value, {
            original_query: previousQuery,
            section: selectedItem.section
          });
        }
      }
    }
  });
};

export default useDownShift;
