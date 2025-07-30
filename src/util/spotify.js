const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;

const scope = "playlist-modify-private playlist-modify-public user-read-private user-read-email";
const authURL = new URL("https://accounts.spotify.com/authorize");

// Generate code verifier
const generateCodeVerifier = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Create code challenge
const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const authorize = async () => {
  // Generate new code verifier and save it
  const codeVerifier = generateCodeVerifier(128);
  localStorage.setItem('code_verifier', codeVerifier);

  // Generate code challenge from verifier
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = {
    client_id: clientID,
    response_type: 'code',
    redirect_uri: redirectURI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    scope: scope,
    show_dialog: true
  };

  // Redirect to authorization endpoint
  authURL.search = new URLSearchParams(params).toString();
  window.location.href = authURL.toString();
};

const getAccessToken = async (code) => {
  const codeVerifier = localStorage.getItem('code_verifier');

  if (!code || !codeVerifier) {
    return false;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return true;
  }
  return false;
};

const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    return false;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientID,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    return true;
  }
  return false;
};

const search = async (term) => {
  let accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    await authorize();
    return [];
  }

  try {
    let response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (response.status === 401) {
      const refreshed = await getRefreshToken();
      if (!refreshed) {
        await authorize();
        return [];
      }
      accessToken = localStorage.getItem('access_token');
      response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    }

    const data = await response.json();
    if (!data.tracks) return [];

    return data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      albumImage: track.album.images[0].url,
      uri: track.uri,
      previewUrl: track.preview_url
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};