import { GetItemPropsOptions } from 'downshift';
import { FormEvent } from 'react';

export type FormSubmitEvent = FormEvent<HTMLFormElement>;

type AutocompleteSubmitEvent = { item: Item; originalQuery: string } | { query: string };

export type OnSubmit = (event: AutocompleteSubmitEvent) => unknown;

export type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;

export type DownshiftGetItemProps = (options: GetItemPropsOptions<Item>) => object;

export type ItemPropsOptions = DownshiftGetItemPropsOptions & {
  sectionName: string;
  indexOffset?: number;
};

export type GetItemProps = (options: ItemPropsOptions) => object;

export type ItemBase = {
  value: string;
  section: string;
  data: {
    id: string;
  };
};

export type Item = Product | SearchSuggestion | ItemBase;

export type SectionOrder = string[];

export type ResultsPerSection = { [key: string]: number };

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
    Products?: Product[];
    'Search Suggestions'?: SearchSuggestion[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any | undefined;
  };
}

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
