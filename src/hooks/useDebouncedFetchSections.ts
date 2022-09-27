import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { AutocompleteApiResponse, AutocompleteResultSections, CioClient, ResultsPerSection } from '../types';

const useDebouncedFetchSection = (query: string, cioClient?: CioClient | null, resultsPerSection?: ResultsPerSection) => {
  const [sections, setSections] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const options: { resultsPerSection?: ResultsPerSection } = {};

  if (resultsPerSection) {
      options.resultsPerSection = resultsPerSection;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, options)
        .then((response: AutocompleteApiResponse) => {
          const newSections: AutocompleteResultSections = {};
          Object.keys(response.sections).forEach((section: string) => {
            newSections[section] = response.sections[section].map((item) => ({ ...item, section }))
          });
          setSections(newSections);
        });
    } else if (!debouncedSearchTerm) {
      setSections({});
    }
  }, [debouncedSearchTerm, cioClient]);

  return sections;
}


export default useDebouncedFetchSection;
