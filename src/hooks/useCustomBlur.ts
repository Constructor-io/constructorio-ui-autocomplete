import { useCallback, useEffect } from 'react';

const useCustomBlur = (isOpen: boolean, closeMenu: () => void, autocompleteClassName: string) => {
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement)?.closest(`.${autocompleteClassName}`)) {
        closeMenu();
      }
    },
    [closeMenu, isOpen, autocompleteClassName]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [handleDocumentClick]);
};

export default useCustomBlur;
