import { useCombobox, UseComboboxReturnValue } from 'downshift';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types/types';
import { Item, OnSubmit } from '../types';

let idCounter = 0;

type UseDownShiftOptions = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onSubmit: OnSubmit;
  previousQuery?: string;
  cioClient: Nullable<ConstructorIOClient>;
};

export type DownShift = UseComboboxReturnValue<Item>;

type UseDownShift = (options: UseDownShiftOptions) => DownShift;

const useDownShift: UseDownShift = ({ setQuery, items, onSubmit, cioClient, previousQuery = '' }) =>
  useCombobox({
    id: `cio-autocomplete-${idCounter++}`, // eslint-disable-line
    items,
    itemToString: (item) => item?.value || '',
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        setQuery(selectedItem.value || '');
        if (selectedItem?.value) {
          if (onSubmit) onSubmit({ item: selectedItem, originalQuery: previousQuery });
          try {
            if (!selectedItem?.data?.url) {
              cioClient?.tracker.trackSearchSubmit(selectedItem.value, {
                originalQuery: previousQuery,
              });
            }
            cioClient?.tracker.trackAutocompleteSelect(selectedItem.value, {
              originalQuery: previousQuery,
              section: selectedItem.section,
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }
      }
    },
  });

export default useDownShift;
