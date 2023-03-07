/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetItemPropsOptions } from 'downshift';
import { ReactNode } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

export type CioClientConfig = { apiKey?: string; cioJsClient?: ConstructorIOClient };

export type CioAutocompleteProps = CioClientConfig & {
  openOnFocus?: boolean;
  onSubmit: OnSubmit;
  onFocus?: () => void;
  onChange?: () => void;
  placeholder?: string;
  children?: ReactNode;
  sections?: Section[];
  zeroStateSections?: Section[];
  autocompleteClassName?: string;
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

export interface ItemBase extends Record<string, any> {
  id?: string;
  url?: string;
  value?: string;
  section: string;
  data?: Record<string, any>;
}

export type Item = Product | SearchSuggestion | ItemBase;

export type GetAutocompleteResultsOptions = { [sectionIdentifier: string]: { numResults: number } };

/** CIO API Response Data */
export type AutocompleteResultSections = {
  [key: string]: Item[] | undefined;
};
type SectionType = 'autocomplete' | 'recommendations' | 'custom';

export type SectionConfiguration = {
  type?: SectionType;
  identifier: string;
  displayName?: string;
  numResults?: number;
};

export interface AutocompleteSection extends SectionConfiguration {
  type?: 'autocomplete';
  data?: Item[];
}

export interface RecommendationsSection extends SectionConfiguration {
  type: 'recommendations';
  data?: Item[];
  itemIds?: string[];
  section?: string;
  term?: string;
}

export interface CustomSection extends SectionConfiguration {
  type: 'custom';
  data: Item[];
}

export type Section = AutocompleteSection | RecommendationsSection | CustomSection;

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
