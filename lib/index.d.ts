/// <reference types="react" />

import { Dispatch } from 'react';
import { GetItemPropsOptions } from 'downshift';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { SetStateAction } from 'react';
import { UseComboboxGetLabelPropsOptions } from 'downshift';

declare interface AutocompleteApiResponse {
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
    Products?: Product[];
    'Search Suggestions'?: SearchSuggestion[];
    [key: string]: any | undefined;
  };
}

export declare function AutocompleteResults(props: AutocompleteResultsProps): JSX.Element;

declare type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode;
};

declare interface AutocompleteSectionConfiguration extends BaseSectionConfiguration {
  type?: 'autocomplete';
  data?: Item[];
  parameters?: {
    numResults?: number;
  };
}

declare type AutocompleteSubmitEvent =
  | {
      item: Item;
      originalQuery: string;
    }
  | {
      query: string;
    };

declare type BaseSectionConfiguration = {
  identifier: string;
  displayName?: string;
  parameters?: Record<string, any>;
};

export declare function CioAutocomplete(props: CioAutocompleteProps): JSX.Element;

declare type CioAutocompleteProps = CioClientOptions & {
  openOnFocus?: boolean;
  onSubmit?: OnSubmit;
  onFocus?: () => void;
  onChange?: () => void;
  placeholder?: string;
  children?: ReactNode;
  sections?: SectionConfiguration[];
  zeroStateSections?: SectionConfiguration[];
};

declare interface CioClient {
  autocomplete: {
    getAutocompleteResults: (term: string, options: any) => Promise<AutocompleteApiResponse>;
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

declare type CioClientOptions = {
  apiKey?: string;
  cioJsClient?: CioClient;
};

declare interface CustomSectionConfiguration extends BaseSectionConfiguration {
  type: 'custom';
  data: Item[];
}

declare type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;

declare type GetItemProps = (options: ItemPropsOptions) => object;

declare type Item = Product | SearchSuggestion | ItemBase;

declare type ItemBase = {
  value: string;
  section: string;
  data: {
    id: string;
    url?: string;
  };
};

declare type ItemPropsOptions = DownshiftGetItemPropsOptions & {
  sectionName: string;
  indexOffset?: number;
};

declare type OnSubmit = (event: AutocompleteSubmitEvent) => unknown;

declare type Product = {
  data: {
    facets: {
      name: string;
      values: string[];
    }[];
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

declare type RecommendationPodResponse = {
  pod: {
    id: string;
    display_name: string;
  };
  results: Product[];
  total_num_results: number;
};

declare interface RecommendationsApiResponse {
  request: {
    feature_variants?: {
      auto_generated_refined_query_rules: string;
      filter_items: string;
      manual_searchandizing: string;
      personalization: string;
      query_items: string;
    };
    features?: {
      auto_generated_refined_query_rules: boolean;
      filter_items: boolean;
      manual_searchandizing: boolean;
      personalization: boolean;
      query_items: boolean;
    };
    num_results: number;
    pod_id: string;
  };
  result_id: string;
  response: RecommendationPodResponse;
}

declare interface RecommendationsSectionConfiguration extends BaseSectionConfiguration {
  type: 'recommendations';
  data?: Item[];
  parameters?: {
    numResults?: number;
    itemIds?: string[];
    section?: string;
    term?: string;
    filters?: any;
    variationsMap?: any;
  };
}

declare type RenderResults = (renderResultsArguments: {
  sections: SectionConfiguration[];
  getItemProps: GetItemProps;
}) => ReactNode;

declare type RenderSectionItemsList = (renderResultsArguments: {
  section: SectionConfiguration;
}) => ReactElement;

declare type ResultsPerSection = {
  [key: string]: number;
};

export declare function SearchInput(props: SearchInputProps): JSX.Element;

declare type SearchInputProps = {
  children?: (args: Partial<Omit<CioAutocompleteProps, 'children'>>) => ReactElement;
};

declare type SearchSuggestion = {
  data: {
    id: string;
    url?: string;
  };
  id: string;
  is_slotted: boolean;
  labels: Record<string, unknown>;
  matched_terms: string[];
  value: string;
  section: 'Search Suggestions';
};

declare type SectionConfiguration =
  | AutocompleteSectionConfiguration
  | RecommendationsSectionConfiguration
  | CustomSectionConfiguration;

export declare function SectionItem(props: SectionItemProps): JSX.Element;

declare interface SectionItemProps {
  item: Item;
  index: number;
  sectionIdentifier: string;
  children?: ReactNode;
}

export declare function SectionItemsList(
  props: SectionItemsListProps
): React_2.ReactElement<any, string | React_2.JSXElementConstructor<any>>;

declare type SectionItemsListProps = {
  section: SectionConfiguration;
  children?: RenderSectionItemsList;
};

declare type TrackAutocompleteSelect = (
  term: string,
  parameters: {
    original_query: string;
    section: string;
  }
) => true | Error;

declare type TrackSearchSubmit = (
  term: string,
  parameters: {
    original_query: string;
  }
) => true | Error;

export declare const useCioAutocomplete: (options: UseCioAutocompleteOptions) => {
  query: string;
  sections: SectionConfiguration[];
  isOpen: boolean;
  getMenuProps: () => any;
  getLabelProps: (options?: UseComboboxGetLabelPropsOptions | undefined) => any;
  openMenu: () => void;
  closeMenu: () => void;
  getItemProps: ({
    item,
    index,
    sectionIdentifier
  }: {
    item: any;
    index?: number | undefined;
    sectionIdentifier?: string | undefined;
  }) => any;
  getInputProps: () => any;
  getFormProps: () => any;
  setQuery: Dispatch<SetStateAction<string>>;
  cioClient: CioClient;
};

declare type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;

export {};
