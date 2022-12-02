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
  sectionConfigurations?: SectionConfiguration[]
) => {
  const [sections, setSections] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const options: { resultsPerSection?: ResultsPerSection } = {};

  if (sectionConfigurations) {
    options.resultsPerSection = sectionConfigurations.reduce(
      (acc, sectionConfig) => ({
        ...acc,
        [sectionConfig.identifier]: sectionConfig?.parameters?.numResults || 8
      }),
      {}
    );
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, options)
        .then((response: AutocompleteApiResponse) => {
          const newSections: AutocompleteResultSections = {};
          Object.keys(response.sections).forEach((section: string) => {
            newSections[section] = response.sections[section].map((item: Item) => ({
              ...item,
              section
            }));
          });
          setSections(newSections);
        });
    } else if (!debouncedSearchTerm) {
      setSections({});
    }
  }, [debouncedSearchTerm, cioClient]);

  return sections;
};

export default useDebouncedFetchSection;
