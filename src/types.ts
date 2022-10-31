import { GetItemPropsOptions } from 'downshift';
import { Dispatch, FormEvent, InputHTMLAttributes, ReactElement, ReactNode, SetStateAction } from 'react';

export type GetLabelProps = () => Record<string, unknown>;

export type GetMenuProps = () => Record<string, unknown>;

export type GetInputProps = () => InputHTMLAttributes<HTMLInputElement>;

export type FormSubmitEvent = FormEvent<HTMLFormElement>;

type AutocompleteSubmitEvent = { item: Item; originalQuery: string } | { query: string };

export type OnSubmit = (event: AutocompleteSubmitEvent) => unknown;

export type GetFormProps = () => InputHTMLAttributes<HTMLFormElement>;

export type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;
export type DownshiftGetItemProps = (options: GetItemPropsOptions<Item>) => object;

export type ItemPropsOptions = DownshiftGetItemPropsOptions & {
  sectionName: SectionName;
  indexOffset?: number
};

export type GetItemProps = (options: ItemPropsOptions) => object;

export type ItemBase = {
  value: string;
  section: string;
  data: {
    id: string;
  };
};

export type Product = {
  data: {
    facets: { name: string; values: string[] }[];
    group_ids: string[];
    id: string;
    image_url: string;
    price: number;
    swatchColor: string;
    url: string;
    variation_id: string;
  };
  is_slotted: boolean;
  labels: Record<string, unknown>;
  matched_terms: string[];
  value: string;
  section: 'Products';
};

export type SearchSuggestion = {
  data: { id: string };
  id: string;
  is_slotted: boolean;
  labels: Record<string, unknown>;
  matched_terms: string[];
  value: string;
  section: 'Search Suggestions';
};

export type Item = Product | SearchSuggestion | ItemBase;

type RenderResultsArguments = {
  sections: SectionConfiguration[];
  getItemProps: GetItemProps;
};

export type RenderResults = (renderResultsArguments: RenderResultsArguments) => ReactNode;

export type SectionName = string;

export type SectionOrder = SectionName[];

type RenderSectionItemsListArguments = {
  section: SectionConfiguration;
};

type GetIndexOffsetArguments = {
  activeSections?: AutocompleteResultSections;
  activeSectionOrder: SectionOrder;
  sectionName: SectionName;
};

export type GetIndexOffset = (args: GetIndexOffsetArguments) => number;

export type RenderSectionItemsList = (renderResultsArguments: RenderSectionItemsListArguments) => ReactElement;

export type SetQuery = Dispatch<SetStateAction<string>>;

type RenderInputArgs = {
  getFormProps: GetFormProps;
  getInputProps: GetInputProps;
  getLabelProps: GetLabelProps;
  setQuery: SetQuery;
};

export type RenderInput = (args: RenderInputArgs) => ReactElement;

export type SectionConfiguration = {
  identifier: string;
  displayName?: string;
  type: 'autocomplete' | 'recommendations' | 'custom';
  numberOfResults?: number;
  additionalParameters?: any,
  data?: Item[],
};

/** UseCioAutocomplete Hook */
type UseCioAutocompleteBase = {
  openOnFocus?: boolean;
  onSubmit?: OnSubmit;
  onFocus?: () => void;
  placeholder?: string;
  sectionConfigurations: SectionConfiguration[],
  zeroStateSectionConfigurations?: SectionConfiguration[],
};

type UseCioAutocompleteWithKey = WithApiKey & UseCioAutocompleteBase;
type UseCioAutocompleteWithClient = WithExistingCioJsClient & UseCioAutocompleteBase;

export type UseCioAutocompleteOptions = UseCioAutocompleteWithKey | UseCioAutocompleteWithClient;

/** CioAutocompleteProps  */
type CioAutocompleteOptions = UseCioAutocompleteOptions & {
  placeholder?: string;
  children?: ReactNode;
};

type CioAutocompleteOptionsWithKey = WithApiKey & CioAutocompleteOptions;
type CioAutocompleteOptionsWithClient = WithExistingCioJsClient & CioAutocompleteOptions;

export type CioAutocompleteProps = CioAutocompleteOptionsWithKey | CioAutocompleteOptionsWithClient;

/** CioAutocomplete */
export type ICioAutocomplete = {
  isOpen: boolean;
  sections: SectionConfiguration[];
  getFormProps: GetFormProps;
  getInputProps: GetInputProps;
  getMenuProps: GetMenuProps;
  getItemProps: GetItemProps;
  getLabelProps: GetLabelProps;
  setQuery: SetQuery;
};

/** CIO Client */
export type ResultsPerSection = { products?: number; searchSuggestions?: number; [key: string]: number | undefined; };

type WithApiKey = { apiKey: string; cioJsClient?: never };
type WithExistingCioJsClient = { apiKey?: never; cioJsClient: CioClient | null | undefined };
export type CioClientOptions = WithApiKey | WithExistingCioJsClient;

// https://constructor-io.github.io/constructorio-client-javascript/module-tracker.html#~trackSearchSubmit
export type TrackSearchSubmit = (
  term: string,
  parameters: {
    original_query: string;
  },
) => true | Error;

// https://constructor-io.github.io/constructorio-client-javascript/module-tracker.html#~trackAutocompleteSelect
export type TrackAutocompleteSelect = (
  term: string,
  parameters: {
    original_query: string;
    section: string;
  },
) => true | Error;

export interface CioClient {
  autocomplete: {
    getAutocompleteResults: (term: string, options) => Promise<AutocompleteApiResponse>;
  };
  tracker: {
    trackInputFocus: () => true | Error;
    trackSearchSubmit: TrackSearchSubmit;
    trackAutocompleteSelect: TrackAutocompleteSelect;
  };
  recommendations: {
    getRecommendations: (podId: string, parameters: any) => Promise<RecommendationsApiResponse>;
  };
}

/** CIO API Response Data */
export type AutocompleteResultSections = {
  [key: string]: Item[] | undefined;
};

export interface AutocompleteApiResponse {
  request: {
    feature_variants: {
      auto_generated_refined_query_rules: string;
      filter_items: string;
      manual_searchandizing: string;
      personalization: string;
      query_items: string;
    };
    features: {
      auto_generated_refined_query_rules: boolean;
      filter_items: boolean;
      manual_searchandizing: boolean;
      personalization: boolean;
      query_items: boolean;
    };
    num_results_Products: number;
    'num_results_Search Suggestions': number;
    searchandized_items: Record<string, unknown>;
    term: string;
  };
  result_id: string;
  sections: {
    Products: Product[];
    'Search Suggestions': SearchSuggestion[];
    [key: string]: any | undefined;
  };
}

export type RecommendationPodResponse = {
  pod: {
    id: string,
    display_name: string,
  };
  results: Product[];
  total_num_results: number;
};

export interface RecommendationsApiResponse {
  request: any;
  result_id: string;
  response: RecommendationPodResponse;
}
