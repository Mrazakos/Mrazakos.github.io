//displaying desired categories

const clientId = "96b556fab4bc4ea6a3a37a8dbdb0b66b"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const clientSecret = "c55e2db3963147e8aa1ed3a014c08d1e";
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    
    const accessToken = await getAccessToken(clientId, clientSecret);
    let top50 = await getMostPopular(accessToken);
    top50 = top50["items"];
    console.log(top50);
    displaySongs(top50);

    
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId, clientSecret) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "client_credentials");

    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function getGenre(accessToken, genre){
    const result = await fetch("https://api.spotify.com/v1/browse/categories/" + genre, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { href } = await result.json();

    return href;
}

export async function getGenreData(accessToken, href){
    const result = await fetch(href, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    

    return await result.json();
}

export async function getMostPopular(accessToken){
    const result = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    const { tracks } = await result.json()
    return tracks;
}

function displaySongs(top50){
    for(const song of top50){
        const track = song.track;
        let html = `
        <li>
            <div class="song">
                <div class="songData">
                    <h3 class="songName">${track.name}</h3>

                    <h4 class="artist">`;
        for(const artist of track.artists){
            html += artist.name + " ";
        }

                    
        html += `   </h4>
                    <p class="album">${track.album.name}</p>
                </div>
            </div>
        </li>`;
        const ol = document.querySelector("ol");
        ol.innerHTML += html;
    }
}