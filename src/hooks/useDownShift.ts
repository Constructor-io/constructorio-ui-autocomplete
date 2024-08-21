import { useCombobox, UseComboboxReturnValue } from 'downshift';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { Item, OnSubmit } from '../types';
import { trackSearchSubmit } from '../utils';

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
        if (selectedItem?.value) {
          if (onSubmit) onSubmit({ item: selectedItem, originalQuery: previousQuery });
          try {
            if (selectedItem?.section === 'Search Suggestions') {
              setQuery(selectedItem.value || '');
              trackSearchSubmit(cioClient, selectedItem.value, {
                originalQuery: previousQuery,
              });
            }

            // Autocomplete Select tracking
            // Recommendation Select tracking
            if (selectedItem.podId && selectedItem.data?.id) {
              cioClient?.tracker.trackRecommendationClick({
                itemName: selectedItem.value,
                itemId: selectedItem.data.id,
                variationId: selectedItem.data.variation_id,
                podId: selectedItem.podId,
                strategyId: selectedItem.strategy?.id,
                section: selectedItem.section,
                resultId: selectedItem.result_id,
              });
              // Select tracking for all other Constructor sections:
              // (ie: Search Suggestions, Products, Custom Cio sections, etc)
              // This does not apply to custom user defined sections that aren't part of Constructor index
            } else if (selectedItem.result_id) {
              cioClient?.tracker.trackAutocompleteSelect(selectedItem.value, {
                originalQuery: previousQuery,
                section: selectedItem.section,
              });
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }
      }
    },
  });

export default useDownShift;
