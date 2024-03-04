const clientID = 'ca8137b016174345a9913b5ee3604e96';
const redirectURI= 'http://localhost:3000';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return Promise.resolve(accessToken);

        const accessTokenURL = window.location.href.match(/access_token=([^&]*)/);
        const expireTime = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenURL && expireTime) {
            accessToken = accessTokenURL[1];
            const expiresIn = Number(expireTime[1]);

            window.setTimeout(() => (accessToken= ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return Promise.resolve(accessToken);
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
            return Promise.resolve();
        };
    },

    async search(term) {
        accessToken = await Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const JSONresponse = await response.json();
        if (!JSONresponse) {
            return [];
        }
        return JSONresponse.tracks.items.map(t => ({
            id: t.id,
            name: t.name,
            artist: t.artists[0].name,
            album: t.album.name,
            uri: t.uri,
        }));
    },
};

//console.log("Value returned by getAccessToken():", Spotify.getAccessToken());

export default Spotify;