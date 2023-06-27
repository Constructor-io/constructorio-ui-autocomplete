import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types/types';
import useDebounce from './useDebounce';
import { AutocompleteResultSections, UserDefinedSection, AdvancedParameters } from '../types';

const transformResponse = (response, options) => {
  const { numTermsWithGroupSuggestions, numGroupsSuggestedPerTerm } = options;
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
        itemIndex < numTermsWithGroupSuggestions
      ) {
        item.data.groups.forEach((group, groupIndex) => {
          if (groupIndex < numGroupsSuggestedPerTerm) {
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

  return newSectionsData;
};

interface IAutocompleteParameters {
  numResults: number;
  resultsPerSection: Record<string, number>;
  hiddenFields: string[];
  filters: Record<string, any>;
  variationsMap: Record<string, any>;
}

let autocompleteParameters = {
  resultsPerSection: {},
  // numResults: 8,
  // hiddenFields: [],
  // filters: {},
  // variationsMap: {}
} as IAutocompleteParameters;

const useDebouncedFetchSection = (
  query: string,
  cioClient: Nullable<ConstructorIOClient>,
  autocompleteSections: UserDefinedSection[],
  advancedParameters: AdvancedParameters
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({});
  const debouncedSearchTerm = useDebounce(query);

  const { numTermsWithGroupSuggestions = 0, numGroupsSuggestedPerTerm = 0 } = advancedParameters;

  if (autocompleteSections) {
    autocompleteParameters.resultsPerSection = autocompleteSections.reduce(
      (acc, sectionConfig) => ({
        ...acc,
        [sectionConfig.identifier]: sectionConfig?.numResults || 8,
      }),
      {}
    );
  }

  autocompleteParameters = {
    ...autocompleteParameters,
    ...advancedParameters?.autocompleteParameters,
  };

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.trim()) {
        try {
          const response = await cioClient?.autocomplete.getAutocompleteResults(
            debouncedSearchTerm,
            autocompleteParameters
          );
          const newSectionsData = transformResponse(response, {
            numTermsWithGroupSuggestions,
            numGroupsSuggestedPerTerm,
          });
          setSectionsData(newSectionsData);
        } catch (error: any) {
          console.log(error);
        }
      } else if (!debouncedSearchTerm) {
        setSectionsData({});
      }
    })();
  }, [debouncedSearchTerm, cioClient, numTermsWithGroupSuggestions, numGroupsSuggestedPerTerm]);

  return sectionsData;
};

export default useDebouncedFetchSection;
