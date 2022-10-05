import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "./SearchInput";
import { CioInputsetup, renderWithProvider } from "../../../tests/utils";

test("Search Input has form wrapper with correct attributes", () => {
	const { container } = renderWithProvider(<SearchInput />);
	const formElement = screen.getByTestId("cio-form");
	expect(container).toContainElement(formElement);
	expect(screen.getByTestId("cio-form")).toHaveClass("cio-form");
	expect(container.querySelector(`.cio-form`)).toHaveAttribute("data-testid");
});

test("Search Input has correct attributes", () => {
	const { container } = renderWithProvider(<SearchInput />);
	expect(screen.getByTestId("cio-input")).toHaveClass("cio-input");
	expect(container.querySelector(`.cio-input`)).toHaveAttribute("data-testid");
	expect(screen.getByTestId("cio-input")).toHaveAttribute("value");
	expect(screen.getByTestId("cio-input")).toHaveAttribute("placeholder");
});

test("Input has correct input value on event value change", () => {
	const { input } = CioInputsetup();
	fireEvent.change(input, { target: { value: "shoes" } });
	expect(input.getAttribute("value")).toBe("shoes");
});

test("Clear input button clears input field", () => {
	const { input } = CioInputsetup();
	const clearButtonElement = screen.getByTestId("cio-clear-btn");
	fireEvent.change(input, { target: { value: "shoes" } });
	expect(input.getAttribute("value")).toBe("shoes");
	fireEvent.click(clearButtonElement);
	expect(input.getAttribute("value")).toBe("");
});
