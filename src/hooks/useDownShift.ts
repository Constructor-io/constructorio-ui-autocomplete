import { GetPropsCommonOptions, useCombobox, UseComboboxGetComboboxPropsOptions } from 'downshift';
import { CioClient, DownshiftGetItemProps, GetInputProps, GetLabelProps, GetMenuProps, Item, OnSubmit } from '../types';

type UseDownShiftOptions = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  onSubmit?: OnSubmit;
  previousQuery?: string;
  cioClient?: CioClient | null;
};

type DownShift = {
  isOpen: boolean;
  getMenuProps: GetMenuProps;
  getItemProps: DownshiftGetItemProps;
  getLabelProps: GetLabelProps;
  openMenu: () => void;
  getInputProps: GetInputProps;
  getComboboxProps: (
    options?: UseComboboxGetComboboxPropsOptions | undefined,
    otherOptions?: GetPropsCommonOptions | undefined,
  ) => Record<string, unknown>;
};

type UseDownShift = (options: UseDownShiftOptions) => DownShift;

const useDownShift: UseDownShift = ({ setQuery, items, onSubmit, cioClient, previousQuery = '' }) => {
  const { isOpen, getMenuProps, getItemProps, getInputProps, getLabelProps, getComboboxProps, openMenu } =
    useCombobox({
      items,
      itemToString: (item) => (item ? item.value : ''),
      onInputValueChange: ({ inputValue = '' }) => {
        setQuery(inputValue);
      },
      onSelectedItemChange({ selectedItem }) {
        if (selectedItem) {
          setQuery(selectedItem.value);
        }
      },
      onIsOpenChange(changes) {
        const isItemClick = changes.type === '__item_click__';
        const isEnterSelectedItem = changes.type === '__input_keydown_enter__';
        if (isEnterSelectedItem || isItemClick) {
          if (onSubmit && changes.selectedItem?.value) {
            onSubmit({ item: changes.selectedItem, originalQuery: previousQuery });
          }
          if (changes.selectedItem?.value) {
            cioClient?.tracker.trackSearchSubmit(changes.selectedItem.value, {
              original_query: previousQuery,
            });
            cioClient?.tracker.trackAutocompleteSelect(changes.selectedItem.value, {
              original_query: previousQuery,
              section: changes.selectedItem.section,
            });
          }
        }
      },
    });

  return {
    isOpen,
    getMenuProps,
    getItemProps,
    openMenu,
    getInputProps,
    getComboboxProps,
    getLabelProps,
  };
};

export default useDownShift;
