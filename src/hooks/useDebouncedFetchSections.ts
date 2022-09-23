/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { AutocompleteApiResponse, AutocompleteResultSections, CioClient, ResultsPerSection } from '../types';

const useDebouncedFetchSection = (query: string, cioClient?: CioClient | null, resultsPerSection?: ResultsPerSection) => {
  const [sections, setSections] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const numProducts =resultsPerSection?.products || 6
  const numSearchSuggestions = resultsPerSection?.searchSuggestions || 6;

  useEffect(() => {
    if (debouncedSearchTerm) {
      const options = {
        resultsPerSection: {
          Products: numProducts,
          'Search Suggestions': numSearchSuggestions,
        },
      };
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, options)
        .then((response: AutocompleteApiResponse) => {
          const newSections: AutocompleteResultSections = {
            products: response.sections['Products'].map((item) => ({ ...item, section: 'Products' })),
            searchSuggestions: response.sections['Search Suggestions'].map((item) => ({
              ...item,
              section: 'Search Suggestions',
            })),
          };
          setSections(newSections);
        }).catch((e) => {
          console.log(e)
        });
    } else if (!debouncedSearchTerm) {
      setSections({});
    }
  }, [debouncedSearchTerm, cioClient, numProducts, numSearchSuggestions]);

  return sections;
}


export default useDebouncedFetchSection;