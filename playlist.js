

const clientId = "96b556fab4bc4ea6a3a37a8dbdb0b66b"; // Replace with your client ID
const clientSecret = "c55e2db3963147e8aa1ed3a014c08d1e";


async function generatePlaylist(){
    const textarea = document.getElementById("query");
    const query = textarea.value;
    console.log(query);
    const tracks = await getSongsFromAI(query);
    const playlistId = await createPlaylist(query);
    addTracks(playlistId, tracks);
    showPlaylist(playlistId);
}





async function createPlaylist(query){
    const result = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        "name": query,
        "description": query,
        "public":false,
    });

    return result.id;
}

async function getSongsFromAI(){

}

async function addTracks(playlistId, tracks){

}

async function showPlaylist(playlistId){

}