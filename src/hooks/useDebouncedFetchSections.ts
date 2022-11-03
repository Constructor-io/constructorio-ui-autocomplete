import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { AutocompleteApiResponse, AutocompleteResultSections, CioClient, Item, ResultsPerSection, SectionConfiguration } from '../types';

const useDebouncedFetchSection = (query: string, cioClient: CioClient | null | undefined, sectionConfigurations?: SectionConfiguration[]) => {
  const [sections, setSections] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const options: { resultsPerSection?: ResultsPerSection } = {};

  if (sectionConfigurations) {
    options.resultsPerSection = sectionConfigurations.reduce((acc, config) => ({ ...acc, [config.identifier]: config?.parameters?.numResults }), {})
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, options)
        .then((response: AutocompleteApiResponse) => {
          const newSections: AutocompleteResultSections = {};
          Object.keys(response.sections).forEach((section: string) => {
            newSections[section] = response.sections[section].map((item: Item) => ({ ...item, section }))
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
