/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetItemPropsOptions, UseComboboxProps, UseComboboxStateChange } from 'downshift';
import { ReactNode } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  IAutocompleteParameters,
  SearchSuggestion as SearchSuggestionFromClient,
  Product as ProductFromClient,
  Item as ItemBase,
  AutocompleteRequestType,
  ConstructorClientOptions,
  RecommendationsParameters,
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
  displayShowAllResultsButton?: boolean;
  debounce?: number;
  translations?: Translations;
  fetchZeroStateOnFocus?: boolean;
}

export type AdvancedParameters = AdvancedParametersBase &
  Omit<IAutocompleteParameters, 'resultsPerSection'>;

// Type UseComboboxProps with items as optional
type OptionalItemsComboboxProps<Item> = Partial<UseComboboxProps<Item>> & {
  items?: Item[];
};

export type CioAutocompleteProps = CioClientConfig &
  OptionalItemsComboboxProps<Item> & {
    openOnFocus?: boolean;
    getSearchResultsUrl?: (item: SearchSuggestion) => string;
    onSubmit: OnSubmit;
    onFocus?: () => void;
    onChange?: (input: string) => void;
    placeholder?: string;
    children?: ReactNode;
    sections?: UserDefinedSection[];
    zeroStateSections?: UserDefinedSection[];
    autocompleteClassName?: string;
    advancedParameters?: AdvancedParameters;
    defaultInput?: string;
  };

/**
 * AutocompleteSubmitEvent type is AutocompleteSelectSubmit or AutocompleteSearchSubmit.
 * Use isAutocompleteSearchSubmit or isAutocompleteSelectSubmit type predicates to safely access event properties.
 * @example if (isAutocompleteSelectSubmit(event)) { ... } //`item` and `originalQuery` are available
 * @example if (isAutocompleteSearchSubmit(event)) { ... } //`query` is available
 */
export type AutocompleteSubmitEvent = AutocompleteSelectSubmit | AutocompleteSearchSubmit;

export type AutocompleteSelectSubmit = {
  item: Item;
  originalQuery: string;
};

export type AutocompleteSearchSubmit = {
  query: string;
};

/**
 * Checks if the provided event is an AutocompleteSelectSubmit event.
 * @param event The event to check.
 * @returns True if the event is an AutocompleteSelectSubmit event, false otherwise.
 * @example if (isAutocompleteSelectSubmit(event)) { ... } // `query` is available
 */
export const isAutocompleteSelectSubmit = (
  event: AutocompleteSubmitEvent
): event is AutocompleteSelectSubmit => 'item' in event && 'originalQuery' in event;

/**
 * Checks if the given event is an AutocompleteSearchSubmit event.
 * @param event The event to check.
 * @returns True if the event is an AutocompleteSearchSubmit event, false otherwise.
 * @example if (isAutocompleteSearchSubmit(event)) { ... } // `item` and `originalQuery` are available
 */
export const isAutocompleteSearchSubmit = (
  event: AutocompleteSubmitEvent
): event is AutocompleteSearchSubmit => 'query' in event;

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
  [key: string]: Item[];
};

/** CIO API Response Data */
export type AutocompleteResultSections = {
  sectionsData: SectionsData;
  request: Partial<AutocompleteRequestType>;
  totalNumResultsPerSection: Record<string, number>;
};
type SectionType = 'autocomplete' | 'recommendations' | 'custom';

export type SectionConfiguration = {
  type?: SectionType;
  displayName?: string;
  numResults?: number;
  // This property will only take effect when using the component and not the hook
  displaySearchTermHighlights?: boolean;
  ref?: React.RefObject<HTMLElement>;
  renderItem?: (props: {
    item: Item;
    query: string;
    getItemProps: (item: Item) => any;
  }) => ReactNode;
};

export interface AutocompleteSectionConfiguration extends SectionConfiguration {
  type?: 'autocomplete';
  indexSectionName: string;
  /** @deprecated use indexSectionName field instead */
  identifier?: string;
}

export type RecommendationsSectionConfiguration = SectionConfiguration & {
  type: 'recommendations';
  indexSectionName?: string;
  podId: string;
  /** @deprecated use podId field instead */
  identifier?: string;
} & Omit<RecommendationsParameters, 'section' | 'numResults'>;

export interface CustomSectionConfiguration extends SectionConfiguration {
  type: 'custom';
  displayName: string;
}

export interface AutocompleteSection extends AutocompleteSectionConfiguration {
  data: Item[];
}

export interface RecommendationsSection extends RecommendationsSectionConfiguration {
  data: Item[];
}

export interface CustomSection extends CustomSectionConfiguration {
  data: Item[];
}

export type Section = AutocompleteSection | RecommendationsSection | CustomSection;

export type UserDefinedSection =
  | AutocompleteSectionConfiguration
  | RecommendationsSectionConfiguration
  | CustomSection;

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

export type HTMLPropsWithCioDataAttributes<T = any> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
> & {
  [key: `data-cnstrc-${string}`]: any;
};

export type Translations = {
  in?: string;
  'show all results'?: string;
};

export interface PodData {
  podId: string;
  displayName: string;
  request: Partial<AutocompleteRequestType>;
}
