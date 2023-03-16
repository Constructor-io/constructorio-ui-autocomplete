import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types/types';
import useDebounce from './useDebounce';
import { AutocompleteResultSections, UserDefinedSection } from '../types';

interface IAutocompleteParameters {
  numResults: number;
  resultsPerSection: Record<string, number>;
  hiddenFields: string[];
  filters: Record<string, any>;
  variationsMap: Record<string, any>;
}

const autocompleteParameters = {
  resultsPerSection: {},
  // numResults: 8,
  // hiddenFields: [],
  // filters: {},
  // variationsMap: {}
} as IAutocompleteParameters;

const useDebouncedFetchSection = (
  query: string,
  cioClient: Nullable<ConstructorIOClient>,
  autocompleteSections?: UserDefinedSection[]
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const numTermsWithGroups = 1;
  const numGroupsPerTerm = 3;

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
            newSectionsData[section] = [];
            const sectionItems = response.sections[section].map((item) => ({
              ...item,
              id: item?.data?.id,
              section,
            }));
            sectionItems.forEach((item, itemIndex) => {
              newSectionsData[section]?.push(item);

              if (
                section === 'Search Suggestions' &&
                item?.data?.groups?.length &&
                itemIndex < numTermsWithGroups
              ) {
                item.data.groups.forEach((group, groupIndex) => {
                  if (groupIndex < numGroupsPerTerm) {
                    const inGroupSearchSuggestion = {
                      ...item,
                      id: `${item.data?.id}_${group.group_id}`,
                      groupName: group.display_name,
                      groupId: group.group_id,
                    };
                    newSectionsData[section]?.push(inGroupSearchSuggestion);
                  }
                });
              }
            });
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
