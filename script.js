//displaying desired categories

const clientId = "96b556fab4bc4ea6a3a37a8dbdb0b66b"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const clientSecret = "c55e2db3963147e8aa1ed3a014c08d1e";
const code = params.get("code");


    
const accessToken = await getAccessToken(clientId, clientSecret);
const queryString = window.location.search;
const genre = new URLSearchParams(queryString).get("genre");
let top50 = undefined;
switch(genre){
    case "all": top50 = await getMostPopular(accessToken, "37i9dQZEVXbMDoHDwVN2tF");
    break;
    case "pop": top50 = await getMostPopular(accessToken, "37i9dQZF1DX2vTOtsQ5Isl");
    break;
    case "hiphop": top50 = await getMostPopular(accessToken, "5TZkls9cEOzWDR6qCxwDot");
    break;
    case "rnb": top50 = await getMostPopular(accessToken, "3SsPWyQnAh1ccWEXZPYaCY");
    break;
    case "rock": top50 = await getMostPopular(accessToken, "1k59k1PJIk5ZJ6ppbFuzgS");
    break;
}

top50 = top50["items"];
console.log(top50);
displaySongs(top50);

    



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

export async function getMostPopular(accessToken, playlistId){
    const result = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
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
        let artists = 0
        for(const artist of track.artists){
            artists++;
            if(artists > 1){
                html += ", " + artist.name;
            } else{
                html += artist.name;
            }
            
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