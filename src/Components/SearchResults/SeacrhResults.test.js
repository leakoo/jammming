import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchResults from "./SearchResults.js";

const mockSearchResults = [
  { id: "1", name: "Song 1", artist: "Artist 1", album: "Album 1" },
  { id: "2", name: "Song 2", artist: "Artist 2", album: "Album 2" },
];

describe("SearchResults Functionality", () => {
  test("renders SearchResults component", () => {
    const mockOnAdd = jest.fn();
    const searchResults = [
      { id: "1", name: "Track 1", artist: "Artist 1", album: "Album 1" },
    ];
    const { getByText } = render(
      <SearchResults searchResults={searchResults} onAdd={mockOnAdd} />
    );

    const addButton = getByText("+");

    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith(searchResults[0]);
  });

  test("renders search results correctly", () => {
    const { getByText } = render(
      <SearchResults searchResults={mockSearchResults} />
    );

    expect(getByText("Results")).toBeTruthy();
    expect(getByText("Song 1")).toBeTruthy();
    expect(getByText("Artist 1 | Album 1")).toBeTruthy();
    expect(getByText("Song 2")).toBeTruthy();
    expect(getByText("Artist 2 | Album 2")).toBeTruthy();
  });
});
