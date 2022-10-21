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
  closeMenu: () => void;
  getInputProps: GetInputProps;
  getComboboxProps: (
    options?: UseComboboxGetComboboxPropsOptions | undefined,
    otherOptions?: GetPropsCommonOptions | undefined,
  ) => any;
};

type UseDownShift = (options: UseDownShiftOptions) => DownShift;

const useDownShift: UseDownShift = ({ setQuery, items, onSubmit, cioClient, previousQuery = '' }) => {
  const { isOpen, getMenuProps, getItemProps, getInputProps, getLabelProps, getComboboxProps, openMenu, closeMenu } =
    useCombobox({
      items,
      itemToString: (item) => (item ? item.value : ''),
      onInputValueChange: async ({ inputValue = '' }) => {
        setQuery(inputValue);
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
                original_query: previousQuery,
              });
            }

            cioClient?.tracker.trackAutocompleteSelect(selectedItem.value, {
              original_query: previousQuery,
              section: selectedItem.section,
            });
          }

          closeMenu();
        }
      },
    });

  return {
    isOpen,
    getMenuProps,
    getItemProps,
    openMenu,
    closeMenu,
    getInputProps,
    getComboboxProps,
    getLabelProps,
  };
};

export default useDownShift;
