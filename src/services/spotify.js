export async function getUserData(token){
    const userData = await fetch('https://api.spotify.com/v1/me', {
                            headers: {'Authorization': 'Bearer ' + token}
                        })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.error(error))
    return userData
}

export async function getUserTracks(token){
    const userTracks = await fetch('https://api.spotify.com/v1/me/tracks', {
                            headers: {'Authorization': 'Bearer ' + token}
                        })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.error(error))
    return userTracks
}

export async function getUserPlaylists(token){
    const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
                            headers: {'Authorization': 'Bearer ' + token}
                        })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.error(error))
    return userPlaylists
}

export async function getUserPlaylistSongs(token, playlist_id){
    const userPlaylists = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                            headers: {'Authorization': 'Bearer ' + token}
                        })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.error(error))
    return userPlaylists
}