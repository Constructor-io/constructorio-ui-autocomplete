/* eslint-disable no-param-reassign */
const useConsoleErrors = (sections, activeSections, zeroStateSections) => {
  if (sections && !Array.isArray(sections)) {
    // eslint-disable-next-line
    console.error(
      'useCioAutocomplete expects sections to reference an array of section configuration objects'
    );
    activeSections = [];
  }

  if (zeroStateSections && !Array.isArray(zeroStateSections)) {
    // eslint-disable-next-line
    console.error(
      'useCioAutocomplete expects zeroStateSections to reference an array of section configuration objects'
    );
    activeSections = [];
  }
};

export default useConsoleErrors;
