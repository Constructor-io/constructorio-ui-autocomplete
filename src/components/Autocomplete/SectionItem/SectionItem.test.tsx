import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CioAutocompleteProvider from "../CioAutocompleteProvider";
import SectionItem from "./SectionItem";
import { CioInputsetup } from "../../../tests/utils";

function renderWithProvider(ui, { sectionOrder = [] } = {}) {
	const Wrapper = ({ children }) => (
		<CioAutocompleteProvider sectionOrder={sectionOrder}>
			{children}
		</CioAutocompleteProvider>
	);
	return render(ui, { wrapper: Wrapper });
}

const searchSuggestion = {
	value: "shoes",
	data: {
		id: "",
	},
	section: "",
};
const productItem = {
	value: "red shoe",
	data: {
		id: "",
		image_url: "https://www.img.com",
	},
	section: "",
};

test("Section item has correct attributes", () => {
	const { container } = renderWithProvider(
		<SectionItem index={0} item={searchSuggestion} sectionName={""} />
	);
	expect(screen.getByTestId("cio-item")).toHaveClass("cio-item");
	expect(container.querySelector(`.cio-item`)).toHaveAttribute("data-testid");
});

test("Search Sugggestion renders correct text", () => {
	const { container } = renderWithProvider(
		<SectionItem index={0} item={searchSuggestion} sectionName={""} />
	);
	expect(container.querySelector(`.cio-item`)).toHaveTextContent("shoes");
});

test("Product item renders correct markup", () => {
	renderWithProvider(
		<SectionItem index={0} item={productItem} sectionName={""} />
	);
	const imageElement = screen.getByTestId("cio-img");
	const textElement = screen.getByTestId("cio-text");
	expect(screen.getByTestId("cio-item")?.children).toContain(imageElement);
	expect(screen.getByTestId("cio-item")?.children).toContain(textElement);
	expect(textElement).toHaveTextContent("red shoe");
	expect(imageElement.getAttribute("src")).toEqual("https://www.img.com");
});

// test("Search Suggestion onClick event updates input value with selected item value", () => {
// 	const { input } = CioInputsetup();
// 	renderWithProvider(
// 		<SectionItem index={0} item={searchSuggestion} sectionName={""} />
// 	);
// 	const searchSuggestionElement = screen.getByTestId("cio-item");
// 	fireEvent.click(searchSuggestionElement);
// 	expect(input.getAttribute("value")).toBe(searchSuggestion.value);
// });
