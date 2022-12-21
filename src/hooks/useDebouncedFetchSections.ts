import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import {
  AutocompleteApiResponse,
  AutocompleteResultSections,
  Item,
  ResultsPerSection,
  SectionConfiguration
} from '../types';
import { CioClient } from './useCioClient';

const useDebouncedFetchSection = (
  query: string,
  cioClient?: CioClient,
  autocompleteSections?: SectionConfiguration[]
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const options: { resultsPerSection?: ResultsPerSection } = {};

  if (autocompleteSections) {
    options.resultsPerSection = autocompleteSections.reduce(
      (acc, sectionConfig) => ({
        ...acc,
        [sectionConfig.identifier]: sectionConfig?.numResults || 8
      }),
      {}
    );
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, options)
        .then((response: AutocompleteApiResponse) => {
          const newSectionsData: AutocompleteResultSections = {};
          Object.keys(response.sections).forEach((section: string) => {
            newSectionsData[section] = response.sections[section].map((item: Item) => ({
              ...item,
              section
            }));
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
