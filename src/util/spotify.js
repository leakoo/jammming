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