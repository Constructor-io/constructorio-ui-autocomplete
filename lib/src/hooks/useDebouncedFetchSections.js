import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
const useDebouncedFetchSection = (query, cioClient, autocompleteSections) => {
  const [sectionsData, setSectionsData] = useState({});
  const debouncedSearchTerm = useDebounce(query);
  const autocompleteParameters = {
    resultsPerSection: {}
    // numResults: 8,
    // hiddenFields: [],
    // filters: {},
    // variationsMap: {}
  };
  if (autocompleteSections) {
    autocompleteParameters.resultsPerSection = autocompleteSections.reduce(
      (acc, sectionConfig) =>
        Object.assign(Object.assign({}, acc), {
          [sectionConfig.identifier]:
            (sectionConfig === null || sectionConfig === void 0
              ? void 0
              : sectionConfig.numResults) || 8
        }),
      {}
    );
  }
  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient === null || cioClient === void 0
        ? void 0
        : cioClient.autocomplete
            .getAutocompleteResults(debouncedSearchTerm, autocompleteParameters)
            .then((response) => {
              const newSectionsData = {};
              Object.keys(response.sections).forEach((section) => {
                newSectionsData[section] = response.sections[section].map((item) =>
                  Object.assign(Object.assign({}, item), { section })
                );
              });
              setSectionsData(newSectionsData);
            });
    } else if (!debouncedSearchTerm) {
      setSectionsData({});
    }
  }, [debouncedSearchTerm, cioClient]);
  return sectionsData;
};
export default useDebouncedFetchSection;
//# sourceMappingURL=useDebouncedFetchSections.js.map
