import React from "react";
import { render } from "@testing-library/react";
import TrackList from "./TrackList";

describe("TrackList Functinality", () => {
  test("renders tracks", () => {
    const tracks = [
      { id: 1, name: "Track 1" },
      { id: 2, name: "Track 2" },
      { id: 3, name: "Track 3" },
    ];

    const onAdd = jest.fn();
    const onRemove = jest.fn();

    const { getByText } = render(
      <TrackList
        tracks={tracks}
        onAdd={onAdd}
        onRemove={onRemove}
        isRemoval={true}
      />
    );

    tracks.forEach((track) => {
      expect(getByText(track.name)).toBeTruthy();
    });
  });
});
