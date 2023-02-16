import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import useDebounce from './useDebounce';
import { AutocompleteResultSections, SectionConfiguration } from '../types';

interface IAdvancedParameters {
  numResults?: number;
  hiddenFields?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variationsMap?: Record<string, any>;
}

interface IAutocompleteParameters {
  resultsPerSection: Record<string, number>;
  numResults: number;
  hiddenFields: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variationsMap: Record<string, any>;
}

const autocompleteParameters = {
  resultsPerSection: {},
  numResults: 8,
  hiddenFields: [],
  filters: {},
  variationsMap: {}
} as IAutocompleteParameters;

const useDebouncedFetchSection = (
  query: string,
  cioClient?: ConstructorIOClient,
  autocompleteSections?: SectionConfiguration[],
  advancedParameters?: IAdvancedParameters
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  if (autocompleteSections) {
    autocompleteParameters.resultsPerSection = autocompleteSections.reduce(
      (acc, sectionConfig) => ({
        ...acc,
        [sectionConfig.identifier]: sectionConfig?.numResults || advancedParameters?.numResults || 8,
      }),
      {}
    );
  }

  if (advancedParameters?.filters) {
    autocompleteParameters.filters = advancedParameters.filters;
  }

  if (advancedParameters?.hiddenFields) {
    autocompleteParameters.hiddenFields = advancedParameters.hiddenFields
  }

  if (advancedParameters?.variationsMap) {
    autocompleteParameters.variationsMap = advancedParameters.variationsMap
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
        });
    } else if (!debouncedSearchTerm) {
      setSectionsData({});
    }
  }, [debouncedSearchTerm, cioClient]);

  return sectionsData;
};

export default useDebouncedFetchSection;
