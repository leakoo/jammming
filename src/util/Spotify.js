const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const scope =
  "playlist-modify-private playlist-modify-public user-read-private user-read-email";
let accessToken = null;

const Spotify = {
  getAccessToken() {
    if (accessToken) return Promise.resolve(accessToken);

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expireTimeMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expireTimeMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return Promise.resolve(accessToken);
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`;
      window.location.assign(accessURL);
      return Promise.resolve();
    }
  },

  async search(term) {
    accessToken = await Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const JSONresponse = await response.json();
    if (!JSONresponse) {
      return [];
    }
    return JSONresponse.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists[0].name,
      album: t.album.name,
      uri: t.uri,
      previewUrl: t.preview_url,
    }));
  },

  async saveUserPlaylist(name, trackURIs) {
    if (!name || !trackURIs) return;
    accessToken = await Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${accessToken}` };
    let userID;

    const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
      headers: header,
    });
    const JSONresponse = await userResponse.json();
    userID = JSONresponse.id;

    let playlistID;
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({ name: name }),
      }
    );
    const playlistJSONresponse = await createPlaylistResponse.json();
    playlistID = playlistJSONresponse.id;

    return await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({ uris: trackURIs }),
      }
    );
  },
};

//console.log("Value returned by getAccessToken():", Spotify.getAccessToken());
//console.log("Value returned by scope", scope);

export default Spotify;
