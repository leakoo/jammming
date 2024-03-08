const clientID = 'ca8137b016174345a9913b5ee3604e96';
const redirectURI= 'http://localhost:3000';
const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';
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
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`;
            window.location = accessURL;
            return Promise.resolve();
        };
    },

    async search(term) {
        accessToken = await Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`},
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

    async saveUserPlaylist(name, trackURIs) {
        if (!name || ! trackURIs) return;
        accessToken = await Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${accessToken}`}
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {headers: header})
        .then(response => response.json())
        .then(async JSONresponse => {
            userID = JSONresponse.id;

            let playlistID;
            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ name: name })
            });
            const JSONresponse_1 = await response.json();
            playlistID = JSONresponse_1.id;
            return await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ uris: trackURIs })
            });
        });
    },
};

//console.log("Value returned by getAccessToken():", Spotify.getAccessToken());
//console.log("Value returned by scope", scope);

export default Spotify;