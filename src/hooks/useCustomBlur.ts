import { useCallback, useEffect } from 'react';

const useCustomBlur = (isOpen: boolean, closeMenu: () => void) => {
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (isOpen && !(event.target as HTMLElement)?.closest('.cio-autocomplete')) {
        closeMenu();
      }
    },
    [closeMenu, isOpen]
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);
};

export default useCustomBlur;
