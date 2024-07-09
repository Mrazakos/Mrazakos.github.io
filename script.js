//displaying desired categories

const clientId = "96b556fab4bc4ea6a3a37a8dbdb0b66b"; // Replace with your client ID

const clientSecret = "c55e2db3963147e8aa1ed3a014c08d1e";

displaySongs(50);

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

function displayNothing(){
    let html=`<div class="nothing">
        <h1 class="nothingText">There are no tracks here!</h1>
        </div>`;
    const songs = document.querySelector(".songs");
    songs.innerHTML += html;
}

export async function displaySongs(numberOfSongs){
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
        default: displayNothing(); 
    }
    top50 = top50["items"];
    const ol = document.querySelector("ol");
    ol.innerHTML = "";
    let num = 0
    for(const song of top50){
        if(num == numberOfSongs){
            break;
        }
        const track = song.track;
        
        let html = `
        <li class="hidden">
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
        ol.innerHTML += html;
        num++;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry.target);
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else{
                entry.target.classList.remove('show');
            }
        });
    }, {
        // Optional: Customize the root margin (adjust as needed)
        rootMargin: '10px',
        // Optional: Set a threshold for intersection (0.5 means 50% visibility)
        threshold: 0.2,
    });
    
    const hiddenElements = document.querySelectorAll('li.hidden');
    console.log(hiddenElements);
    hiddenElements.forEach((el) => observer.observe(el));
    
}