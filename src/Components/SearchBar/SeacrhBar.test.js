import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar.js";

describe("SearchBar Functionality", () => {
  test("renders SearchBar component", () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const inputElement = getByPlaceholderText(/Enter Song Name/i);
    const searchButton = getByText(/SEARCH/i);

    fireEvent.change(inputElement, { target: { value: "Test Song" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("Test Song");
  });

  test("searches for a song when search button is clicked", () => {
    const mockOnSearch = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const inputElement = getByPlaceholderText(/Enter Song Name/i);
    const searchButton = getByText(/SEARCH/i);

    fireEvent.change(inputElement, { target: { value: "Test Song" } });

    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("Test Song");
  });
});

describe("Input Functionality", () => {
  test("renders search input correctly", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const inputElement = getByPlaceholderText("Enter Song Name");
    expect(inputElement);
  });

  test("input change updates state correctly", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const inputElement = getByPlaceholderText("Enter Song Name");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(inputElement.value).toBe("test");
  });
});
