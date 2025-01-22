const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const scope =
  "playlist-modify-private playlist-modify-public user-read-private user-read-email";
let accessToken = null;

const Spotify = {
  getAccessToken() {
    const storedToken = localStorage.getItem('spotifyAccessToken');
    const storedTokenExpiry = localStorage.getItem('spotifyTokenExpiry');

    if (storedToken && storedTokenExpiry) {
      const currentTime = Date.now();
      const tokenExpiryTime = parseInt(storedTokenExpiry, 10);

      if(currentTime < tokenExpiryTime) {
        accessToken = storedToken;
        return Promise.resolve(accessToken);

      } else {
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyTokenExpiry');
        accessToken = '';
      }
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expireTimeMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expireTimeMatch[1]);

      const tokenExpiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem('spotifyAccessToken', accessToken);
      localStorage.setItem('spotifyTokenExpiry', tokenExpiryTime.toString());


      window.setTimeout(() => {
        console.log("Token expired. Removing from localStorage...");
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyTokenExpiry');
        accessToken = "";
      }, expiresIn * 1000);

      window.history.pushState("Access Token", null, "/");
      return Promise.resolve(accessToken);
    } else {
      console.log("No valid token found. Redirecting to reauthorize...");
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`;
      window.location.assign(accessURL);
      return Promise.resolve();
    }
  },

  async search(term) {

    if (!accessToken) {
      accessToken = await Spotify.getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const JSONresponse = await response.json();

    if (!JSONresponse || !JSONresponse.tracks || !JSONresponse.tracks.items) {
      return [];
    }

    return JSONresponse.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists[0].name,
      album: t.album.name,
      albumImage: t.album.images[0].url,
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

  handleCallback() {
    const accessTokenMatch = window.location.hash.match(/access_token=([^&]*)/);
    const expireTimeMatch = window.location.hash.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expireTimeMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expireTimeMatch[1]);

      const tokenExpiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem('spotifyAccessToken', accessToken);
      localStorage.setItem('spotifyTokenExpiry', tokenExpiryTime.toString());

      window.setTimeout(() => {
        console.log("Token expired. Removing from localStorage...");
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyTokenExpiry');
        accessToken = "";
      }, expiresIn * 1000);

      window.history.pushState("Access Token", null, "/");
    } else {
      console.log("No access token in URL. Something went wrong!");
    }
  }
};

if (window.location.pathname === "/callback") {
  Spotify.handleCallback();
}

//console.log("Value returned by getAccessToken():", Spotify.getAccessToken());
//console.log("Value returned by scope", scope);

export default Spotify;