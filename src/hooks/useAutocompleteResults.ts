import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { RequestFeatureVariant } from '@constructor-io/constructorio-client-javascript/lib/types/types';
import useDebounce from './useDebounce';
import { AutocompleteResultSections, SectionConfiguration } from '../types';

interface IAutocompleteParameters {
  numResults: number;
  resultsPerSection: Record<string, number>;
  hiddenFields: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variationsMap: Record<string, any>;
}

const autocompleteParameters = {
  resultsPerSection: {},
  // numResults: 8,
  // hiddenFields: [],
  // filters: {},
  // variationsMap: {}
} as IAutocompleteParameters;

const useAutocompleteResults = (
  query: string,
  cioClient?: ConstructorIOClient,
  autocompleteSections?: SectionConfiguration[]
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({});
  const [featureVariants, setFeatureVariants] = useState<Partial<RequestFeatureVariant>>();
  const debouncedSearchTerm = useDebounce(query);

  if (autocompleteSections) {
    autocompleteParameters.resultsPerSection = autocompleteSections.reduce(
      (acc, sectionConfig) => ({
        ...acc,
        [sectionConfig.identifier]: sectionConfig?.numResults || 8,
      }),
      {}
    );
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      cioClient?.autocomplete
        .getAutocompleteResults(debouncedSearchTerm, autocompleteParameters)
        .then((response) => {
          const newSectionsData: AutocompleteResultSections = {};
          Object.keys(response.sections).forEach((section: string) => {
            newSectionsData[section] = response.sections[section].map((item) => ({
              ...item,
              section,
            }));
          });
          setSectionsData(newSectionsData);
          if (response.request.features?.custom_autosuggest_ui) {
            setFeatureVariants(response.request.feature_variants);
          }
        });
    } else if (!debouncedSearchTerm) {
      setSectionsData({});
    }
  }, [debouncedSearchTerm, cioClient]);

  return { sectionsData, featureVariants };
};

export default useAutocompleteResults;
