import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CioAutocompleteProvider from "../components/Autocomplete/CioAutocompleteProvider";
import { SearchInput } from "../components";

export function renderWithProvider(ui, { sectionOrder = [] } = {}) {
	const Wrapper = ({ children }) => (
		<CioAutocompleteProvider apiKey={'key_jaqzPcUDnK66puIO'} sectionOrder={sectionOrder}>
			{children}
		</CioAutocompleteProvider>
	);
	return render(ui, { wrapper: Wrapper });
}

export const CioInputsetup = () => {
	const utils = renderWithProvider(<SearchInput />);
	const input = utils.getByTestId("cio-input");
	return {
		input,
		...utils,
	};
};
