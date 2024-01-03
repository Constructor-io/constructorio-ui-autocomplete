import { useEffect, useMemo, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  Nullable,
  IAutocompleteParameters,
  AutocompleteResponse,
} from '@constructor-io/constructorio-client-javascript/lib/types';
import useDebounce from './useDebounce';
import {
  AutocompleteResultSections,
  AdvancedParameters,
  AdvancedParametersBase,
  SectionsData,
  AutocompleteSectionConfiguration,
} from '../types';

const transformResponse = (response: AutocompleteResponse, options) => {
  const { numTermsWithGroupSuggestions, numGroupsSuggestedPerTerm } = options;
  const newSectionsData: SectionsData = {};
  Object.keys(response?.sections || {}).forEach((section: string) => {
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

  return { sectionsData: newSectionsData, request: response?.request };
};

const useDebouncedFetchSection = (
  query: string,
  cioClient: Nullable<ConstructorIOClient>,
  autocompleteSections: AutocompleteSectionConfiguration[],
  advancedParameters?: AdvancedParameters
) => {
  const [sectionsData, setSectionsData] = useState<AutocompleteResultSections>({
    sectionsData: {},
    request: {},
  });
  const debouncedSearchTerm = useDebounce(query, advancedParameters?.debounce);

  const { numTermsWithGroupSuggestions = 0, numGroupsSuggestedPerTerm = 0 } =
    advancedParameters || {};
  const autocompleteParameters = useMemo(() => {
    const decoratedParameters: AdvancedParametersBase & IAutocompleteParameters = {
      ...advancedParameters,
    };

    // eslint-disable-next-line no-param-reassign
    delete decoratedParameters?.debounce;

    if (autocompleteSections) {
      decoratedParameters.resultsPerSection = autocompleteSections.reduce(
        (acc, sectionConfig) => ({
          ...acc,
          [sectionConfig.indexSectionName]: sectionConfig?.numResults || 8,
        }),
        {}
      );
    }

    return decoratedParameters;
  }, [autocompleteSections, advancedParameters]);

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm.trim()) {
        try {
          const response = await cioClient?.autocomplete.getAutocompleteResults(
            debouncedSearchTerm,
            autocompleteParameters
          );
          if (response) {
            const newSectionsData = transformResponse(response, {
              numTermsWithGroupSuggestions,
              numGroupsSuggestedPerTerm,
            });
            setSectionsData(newSectionsData);
          }
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } else if (!debouncedSearchTerm) {
        setSectionsData({ sectionsData: {}, request: {} });
      }
    })();
  }, [
    debouncedSearchTerm,
    cioClient,
    numTermsWithGroupSuggestions,
    numGroupsSuggestedPerTerm,
    autocompleteParameters,
  ]);

  return sectionsData;
};

export default useDebouncedFetchSection;
