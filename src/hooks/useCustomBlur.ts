import { useCallback, useEffect } from 'react';

const useCustomBlur = (isOpen: boolean, closeMenu: () => void) => {
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement)?.closest('.cio-autocomplete')) {
        closeMenu();
      }
    },
    [closeMenu, isOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [handleDocumentClick]);
};

export default useCustomBlur;
