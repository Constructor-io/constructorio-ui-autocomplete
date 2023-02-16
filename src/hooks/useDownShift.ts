import { useCombobox, UseComboboxReturnValue } from 'downshift';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Item, OnSubmit } from '../types';

let idCounter = 0;

type UseDownShiftOptions = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onSubmit: OnSubmit;
  previousQuery?: string;
  cioClient?: ConstructorIOClient;
  onChange?: (string) => void;
};

export type DownShift = UseComboboxReturnValue<Item>;

type UseDownShift = (options: UseDownShiftOptions) => DownShift;

const useDownShift: UseDownShift = ({
  setQuery,
  items,
  onSubmit,
  cioClient,
  previousQuery = '',
  onChange,
}) =>
  useCombobox({
    id: `cio-autocomplete-${idCounter++}`, // eslint-disable-line
    items,
    itemToString: (item) => item?.value || '',
    onInputValueChange: async ({ inputValue = '' }) => {
      setQuery(inputValue);
      if (onChange) {
        onChange(inputValue);
      }
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        setQuery(selectedItem.value || '');
        if (selectedItem?.value) {
          if (onSubmit) onSubmit({ item: selectedItem, originalQuery: previousQuery });
          if (!selectedItem?.data?.url) {
            cioClient?.tracker.trackSearchSubmit(selectedItem.value, {
              original_query: previousQuery,
            });
          }
          cioClient?.tracker.trackAutocompleteSelect(selectedItem.value, {
            original_query: previousQuery,
            section: selectedItem.section,
          });
        }
      }
    },
  });

export default useDownShift;
