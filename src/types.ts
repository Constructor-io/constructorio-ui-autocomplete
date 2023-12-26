/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetItemPropsOptions } from 'downshift';
import { ReactNode } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  IAutocompleteParameters,
  SearchSuggestion as SearchSuggestionFromClient,
  Product as ProductFromClient,
  Item as ItemBase,
  AutocompleteRequestType,
  ConstructorClientOptions,
} from '@constructor-io/constructorio-client-javascript/lib/types';

export type { IAutocompleteParameters } from '@constructor-io/constructorio-client-javascript/lib/types';

export type CioClientConfig = {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
  cioJsClientOptions?: ConstructorClientOptions;
};

export interface AdvancedParametersBase {
  numTermsWithGroupSuggestions?: number;
  numGroupsSuggestedPerTerm?: number;
  displaySearchSuggestionImages?: boolean;
  displaySearchSuggestionResultCounts?: boolean;
  debounce?: number;
}

export type AdvancedParameters = AdvancedParametersBase &
  Omit<IAutocompleteParameters, 'resultsPerSection'>;

export type CioAutocompleteProps = CioClientConfig & {
  openOnFocus?: boolean;
  onSubmit: OnSubmit;
  onFocus?: () => void;
  onChange?: (input: string) => void;
  placeholder?: string;
  children?: ReactNode;
  sections?: UserDefinedSection[];
  zeroStateSections?: UserDefinedSection[];
  autocompleteClassName?: string;
  advancedParameters?: AdvancedParameters;
};

export type AutocompleteSubmitEvent = { item: Item; originalQuery: string } | { query: string };

export type OnSubmit = (event: AutocompleteSubmitEvent) => unknown;

export type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;

export type DownshiftGetItemProps = (options: GetItemPropsOptions<Item>) => object;

export type ItemPropsOptions = DownshiftGetItemPropsOptions & {
  sectionName: string;
  indexOffset?: number;
};

export type GetItemProps = (options: ItemPropsOptions) => object;

export type Item = Product | SearchSuggestion | InGroupSuggestion | ItemBase;

export type GetAutocompleteResultsOptions = { [sectionIdentifier: string]: { numResults: number } };

export type SectionsData = {
  [key: string]: Item[] | undefined;
};

/** CIO API Response Data */
export type AutocompleteResultSections = {
  sectionsData: SectionsData;
  request: Partial<AutocompleteRequestType>;
};
type SectionType = 'autocomplete' | 'recommendations' | 'custom';

export type SectionConfiguration = {
  type?: SectionType;
  identifier: string;
  displayName?: string;
  numResults?: number;
  // This property will only take effect when using the component and not the hook
  displaySearchTermHighlights?: boolean;
};

export interface AutocompleteSection extends SectionConfiguration {
  type?: 'autocomplete';
  data: Item[];
}

export interface RecommendationsSection extends SectionConfiguration {
  type: 'recommendations';
  data: Item[];
  itemIds?: string[];
  section?: string;
  term?: string;
}

export interface CustomSection extends SectionConfiguration {
  type: 'custom';
  data: Item[];
}

export type Section = AutocompleteSection | RecommendationsSection | CustomSection;

export type UserDefinedSection = CustomSection | SectionConfiguration;

export type Product = ProductFromClient & {
  section: 'Products';
};

export type SearchSuggestion = SearchSuggestionFromClient & {
  section: 'Search Suggestions';
};

export type InGroupSuggestion = SearchSuggestion & {
  groupId: string;
  groupName: string;
};
