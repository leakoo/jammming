import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Track from "./Track.js";

const trackInfo = {
  name: "Test Track",
  artist: "Test Artist",
  album: "Test Album",
};

describe("Track Functionality", () => {
  test("Renders Track info", () => {
    const { getByText } = render(<Track track={trackInfo} />);
    expect(getByText("Test Track")).toBeTruthy();
    expect(getByText("Test Artist | Test Album")).toBeTruthy();
  });

  test("calls onAdd when + is clicked", () => {
    const onAddMock = jest.fn();
    const { getByText } = render(<Track track={trackInfo} onAdd={onAddMock} />);
    const addButton = getByText("+");

    fireEvent.click(addButton);

    expect(onAddMock).toHaveBeenCalledWith(trackInfo);
  });

  test("calls onRemove when - is clicked", () => {
    const onRemoveMock = jest.fn();
    const { getByText } = render(
      <Track track={trackInfo} onRemove={onRemoveMock} isRemoval={true} />
    );
    const RemoveButton = getByText("-");

    fireEvent.click(RemoveButton);

    expect(onRemoveMock).toHaveBeenCalledWith(trackInfo);
  });
});
