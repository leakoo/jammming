import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Playlist from "./Playlist.js";

test("render playlist name input and save button", () => {
  const onSaveMock = jest.fn();
  const onNameChangeMock = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <Playlist
      playlistName="My Playlist"
      onSave={onSaveMock}
      onNameChange={onNameChangeMock}
      playlistTracks={[]}
    />
  );

  const playlistNameInput = getByPlaceholderText("Playlist Name");
  const saveButton = getByText("Save To Spotify");

  expect(playlistNameInput).toBeTruthy();
  expect(saveButton).toBeTruthy();
});

test("should call onSave when save button is clicked", () => {
  const onSaveMock = jest.fn();
  const onNameChangeMock = jest.fn();

  const { getByText } = render(
    <Playlist
      playlistName="My Playlist"
      onSave={onSaveMock}
      onNameChange={onNameChangeMock}
      playlistTracks={[]}
    />
  );

  const saveButton = getByText("Save To Spotify");
  fireEvent.click(saveButton);

  expect(onSaveMock).toHaveBeenCalledTimes(1);
});

test("should update playlist name input value and call onNameChange when input value changes", () => {
  const onSaveMock = jest.fn();
  const onNameChangeMock = jest.fn();

  const { getByPlaceholderText } = render(
    <Playlist
      playlistName="My Playlist"
      onSave={onSaveMock}
      onNameChange={onNameChangeMock}
      playlistTracks={[]}
    />
  );

  const playlistNameInput = getByPlaceholderText("Playlist Name");
  fireEvent.change(playlistNameInput, {
    target: { value: "New Playlist Name" },
  });

  expect(playlistNameInput.value).toBe("New Playlist Name");
  expect(onNameChangeMock).toHaveBeenCalledWith("New Playlist Name");
});
