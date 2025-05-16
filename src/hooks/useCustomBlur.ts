import { useCallback, useEffect } from 'react';

const useCustomBlur = (isOpen: boolean, closeMenu: () => void, autocompleteClassName: string) => {
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      const classNames = autocompleteClassName.split(' ').join('.');
      if (isOpen && !(event.target as HTMLElement)?.closest(`.${classNames}`)) {
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
