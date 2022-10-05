import { useState } from "react";
import useCioClient, { CioClientOptions } from "./useCioClient";
import useDownShift from "./useDownShift";
import useDebouncedFetchSection from "./useDebouncedFetchSections";
import {
	Item,
	SectionOrder,
	AutocompleteResultSections,
} from "../types";
import usePrevious from "./usePrevious";
import { getIndexOffset } from "../utils";
import { CioAutocompleteProps } from "../components/Autocomplete/CioAutocompleteProvider";


const useCioAutocomplete = (
	options: Omit<CioAutocompleteProps, 'children'>
) => {
	const defaultPlaceholder = "What can we help you find today?";
	const {
		resultsPerSection,
		onSubmit,
		onChange,
		openOnFocus,
		apiKey,
		cioJsClient,
		placeholder = defaultPlaceholder,
		sectionOrder = ["Search Suggestions", "Products"],
		zeroStateSectionOrder,
		zeroStateSections,
	} = options;
	
	const [query, setQuery] = useState("");
	const previousQuery = usePrevious(query);
	const cioClient = useCioClient({ apiKey, cioJsClient } as CioClientOptions);
	const sections = useDebouncedFetchSection(
		query,
		cioClient,
		resultsPerSection
	);
	const items: Item[] = [];

	const zeroStateSectionsActive =
		!query.length && zeroStateSectionOrder && zeroStateSections;

	const activeSectionOrder: SectionOrder = zeroStateSectionsActive
		? zeroStateSectionOrder
		: sectionOrder;
	const activeSections: AutocompleteResultSections = zeroStateSectionsActive
		? zeroStateSections
		: sections;

	activeSectionOrder.forEach((sectionName) => {
		const sectionItems = activeSections[sectionName] || [];
		items.push(...sectionItems);
	});

	const {
		isOpen,
		getComboboxProps,
		getMenuProps,
		getItemProps,
		getLabelProps,
		getInputProps,
		openMenu,
		closeMenu,
	} = useDownShift({ setQuery, items, onSubmit, cioClient, previousQuery, onChange });

	return {
		query,
		sections,
		sectionOrder,
		isOpen,
		getMenuProps: () => ({
			...getMenuProps(),
			className: "cio-results",
			"data-testid": "cio-results",
		}),
		getLabelProps,
		openMenu,
		closeMenu,
		getItemProps: ({ item, index = 0, sectionName = "products" }) => {
			const indexOffset = getIndexOffset({
				activeSections,
				activeSectionOrder,
				sectionName,
			});
			return {
				...getItemProps({ item, index: index + indexOffset }),
				className: "cio-item",
				"data-testid": "cio-item", 
			};
		},
		getInputProps: () => ({
			...getInputProps(),
			value: query,
			onFocus: () => {
				if (options.onFocus) {
					options.onFocus();
				}
				if (openOnFocus) {
					openMenu();
				}
				cioClient?.tracker?.trackInputFocus();
			},
			className: "cio-input",
			"data-testid": "cio-input",
			placeholder: placeholder,
		}),
		getFormProps: () => ({
			...getComboboxProps(),
			onSubmit: (event) => {
				event.preventDefault();
				if (onSubmit) {
					onSubmit({ query });
				}
				cioClient?.tracker.trackSearchSubmit(query, { original_query: query });
				return { query };
			},
			className: "cio-form",
			"data-testid": "cio-form",
		}),
		setQuery,
		cioClient,
	};
};

export default useCioAutocomplete;
