const SongDetail = ({ song }) => {
    const handleClick = async() => {
        const response = await fetch('/api/songs/' + song._id, {
            method: 'DELETE',
        })
        const json = await response.json()

        if (response.ok) {
            console.log('Song deleted:', json);
            window.location.reload()
        } else {
            console.error('Failed to delete the song:', json.error);
        }
    };

    return(
        <div className="song-details">
            <h4>Track Name: {song.trackName}</h4>
            <p>Total Tracks: {song.totalTracks}</p>
            <p>Artist Name: {song.artistName}</p>
            <p>Album Name: {song.albumName}</p>
            <p>Popularity: {song.popularity}</p> 
            <p>Date Created:{song.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default SongDetail;
