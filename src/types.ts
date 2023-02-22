/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetItemPropsOptions } from 'downshift';
import { FormEvent, ReactNode } from 'react';
import { CioClientConfig } from './hooks/useCioClient';

export type CioAutocompleteProps = CioClientConfig & {
  openOnFocus?: boolean;
  onSubmit: OnSubmit;
  onFocus?: () => void;
  onChange?: () => void;
  placeholder?: string;
  children?: ReactNode;
  sections?: SectionConfiguration[];
  zeroStateSections?: SectionConfiguration[];
  autocompleteClassName?: string;
};

export type FormSubmitEvent = FormEvent<HTMLFormElement>;

export type AutocompleteSubmitEvent = { item: Item; originalQuery: string } | { query: string };

export type OnSubmit = (event: AutocompleteSubmitEvent) => unknown;

export type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;

export type DownshiftGetItemProps = (options: GetItemPropsOptions<Item>) => object;

export type ItemPropsOptions = DownshiftGetItemPropsOptions & {
  sectionName: string;
  indexOffset?: number;
};

export type GetItemProps = (options: ItemPropsOptions) => object;

export interface ItemBase extends Record<string, any> {
  id?: string;
  url?: string;
  value?: string;
  section: string;
  data?: Record<string, any>;
}

export type Item = ItemBase;

export type SectionOrder = string[];

export type GetAutocompleteResultsOptions = { [sectionIdentifier: string]: { numResults: number } };

/** CIO API Response Data */
export type AutocompleteResultSections = {
  [key: string]: Item[] | undefined;
};

type BaseSectionConfiguration = {
  identifier: string;
  displayName?: string;
  numResults?: number;
};

interface AutocompleteSectionConfiguration extends BaseSectionConfiguration {
  type?: 'autocomplete';
  data?: Item[];
}

export interface RecommendationsSectionConfiguration extends BaseSectionConfiguration {
  type: 'recommendations';
  data?: Item[];
  itemIds?: string[];
  section?: string;
  term?: string;
}

interface CustomSectionConfiguration extends BaseSectionConfiguration {
  type: 'custom';
  data: Item[];
}

export type SectionConfiguration =
  | AutocompleteSectionConfiguration
  | RecommendationsSectionConfiguration
  | CustomSectionConfiguration;

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

export type RecommendationPodResponse = {
  pod: {
    id: string;
    display_name: string;
  };
  results: Product[];
  total_num_results: number;
};

export interface RecommendationsApiResponse {
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
