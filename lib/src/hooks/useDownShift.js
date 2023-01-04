import { __awaiter } from 'tslib';
import { useCombobox } from 'downshift';
let idCounter = 0;
const useDownShift = ({ setQuery, items, onSubmit, cioClient, previousQuery = '', onChange }) => {
  return useCombobox({
    id: `cio-autocomplete-${idCounter++}`,
    items,
    itemToString: (item) => (item === null || item === void 0 ? void 0 : item.value) || '',
    onInputValueChange: ({ inputValue = '' }) =>
      __awaiter(void 0, void 0, void 0, function* () {
        setQuery(inputValue);
        if (onChange) {
          onChange(inputValue);
        }
      }),
    onSelectedItemChange({ selectedItem }) {
      var _a;
      if (selectedItem) {
        setQuery(selectedItem.value || '');
        if (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) {
          if (onSubmit) onSubmit({ item: selectedItem, originalQuery: previousQuery });
          if (
            !((_a =
              selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.data) ===
              null || _a === void 0
              ? void 0
              : _a.url)
          ) {
            cioClient === null || cioClient === void 0
              ? void 0
              : cioClient.tracker.trackSearchSubmit(selectedItem.value, {
                  original_query: previousQuery
                });
          }
          cioClient === null || cioClient === void 0
            ? void 0
            : cioClient.tracker.trackAutocompleteSelect(selectedItem.value, {
                original_query: previousQuery,
                section: selectedItem.section
              });
        }
      }
    }
  });
};
export default useDownShift;
//# sourceMappingURL=useDownShift.js.map
