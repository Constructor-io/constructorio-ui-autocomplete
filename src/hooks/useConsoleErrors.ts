import { useEffect } from 'react';

const useConsoleErrors = (sections, zeroStateSections) => {
  useEffect(() => {
    if (sections && !Array.isArray(sections)) {
      // eslint-disable-next-line
      console.error(
        'useCioAutocomplete expects sections to reference an array of section configuration objects'
      );
    }

    if (zeroStateSections && !Array.isArray(zeroStateSections)) {
      // eslint-disable-next-line
      console.error(
        'useCioAutocomplete expects zeroStateSections to reference an array of section configuration objects'
      );
    }
  }, [sections, zeroStateSections]);
};

export default useConsoleErrors;
