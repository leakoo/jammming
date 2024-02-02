const clientID = 'ca8137b016174345a9913b5ee3604e96';
const redirectURI= 'http://localhost:3000';
const scope = 'user-read-private user-read-email';
let accessToken = '';

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenURL = window.location.href.match(/access_token=([^&]*)/);
        const expireTime = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenURL && expireTime) {
            accessToken = accessTokenURL[1];
            const expiresIn = Number(expireTime[1])

            window.setTimeout(() => (accessToken= ""), expiresIn * 1000);
            window.history.pushState("access Token", null, "/");
        } else {
            const redirectURL = `https://accounts.spotify.com/authorize?client_id=${clientID}_ID&response_type=token&redirect_uri=${redirectURI}&scope=${scope}`;
        };
    }
};

export default Spotify;