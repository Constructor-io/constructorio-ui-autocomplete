/// <reference types="react" />

import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { constructorIoConstructorioClientJavascript } from '@constructor-io/constructorio-client-javascript';
import { Dispatch } from 'react';
import { GetItemPropsOptions } from 'downshift';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { SetStateAction } from 'react';
import { UseComboboxGetLabelPropsOptions } from 'downshift';

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

declare type AutocompleteSubmitEvent = {
    item: Item;
    originalQuery: string;
} | {
    query: string;
};

declare type BaseSectionConfiguration = {
    identifier: string;
    displayName?: string;
    parameters?: Record<string, any>;
};

export declare function CioAutocomplete(props: CioAutocompleteProps): JSX.Element;

declare type CioAutocompleteProps = CioClientConfig & {
    openOnFocus?: boolean;
    onSubmit?: OnSubmit;
    onFocus?: () => void;
    onChange?: () => void;
    placeholder?: string;
    children?: ReactNode;
    sections?: SectionConfiguration[];
    zeroStateSections?: SectionConfiguration[];
};

declare type CioClientConfig = {
    apiKey?: string;
    cioJsClient?: ConstructorIOClient;
};

declare interface CustomSectionConfiguration extends BaseSectionConfiguration {
    type: 'custom';
    data: Item[];
}

declare type DownshiftGetItemPropsOptions = GetItemPropsOptions<Item>;

declare type GetItemProps = (options: ItemPropsOptions) => object;

declare type Item = Product | SearchSuggestion | ItemBase;

declare interface ItemBase extends Record<string, any> {
    id?: string;
    url?: string;
}

declare interface ItemBase extends Record<string, any> {
    value?: string;
    section: string;
    data?: Record<string, any>;
}

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

declare type SectionConfiguration = AutocompleteSectionConfiguration | RecommendationsSectionConfiguration | CustomSectionConfiguration;

export declare function SectionItem(props: SectionItemProps): JSX.Element;

declare interface SectionItemProps {
    item: Item;
    index: number;
    sectionIdentifier: string;
    children?: ReactNode;
    key?: string;
}

export declare function SectionItemsList(props: SectionItemsListProps): React_2.ReactElement<any, string | React_2.JSXElementConstructor<any>>;

declare type SectionItemsListProps = {
    section: SectionConfiguration;
    children?: RenderSectionItemsList;
    key?: string;
};

export declare const useCioAutocomplete: (options: UseCioAutocompleteOptions) => {
    query: string;
    sections: SectionConfiguration[];
    isOpen: boolean;
    getMenuProps: () => any;
    getLabelProps: (options?: UseComboboxGetLabelPropsOptions | undefined) => any;
    openMenu: () => void;
    closeMenu: () => void;
    getItemProps: ({ item, index, sectionIdentifier }: {
        item: any;
        index?: number | undefined;
        sectionIdentifier?: string | undefined;
    }) => any;
    getInputProps: () => any;
    getFormProps: () => {
        onSubmit: (event: any) => {
            query: string;
        };
        className: string;
        'data-testid': string;
    };
    setQuery: Dispatch<SetStateAction<string>>;
    cioClient: constructorIoConstructorioClientJavascript | undefined;
};

declare type UseCioAutocompleteOptions = Omit<CioAutocompleteProps, 'children'>;

export { }
