import React, { useState } from 'react';
import axios from 'axios';
const SongForm = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [totalTracks, setTotalTracks] = useState('');
    const [artistName, setArtistName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [popularity, setPopularity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedUrl = new URL(url);
            const parts = parsedUrl.pathname.split('/');
            const trackId = parts[parts.length - 1];
            const response = await axios.post('http://localhost:4000/api/songs/tracks', { trackId });
            console.log('Track Info:', response.data);

            if (!response.data.name) {
                setError('Please enter a valid URL');
            } else {
                setTrackName(response.data.name);
                setTotalTracks(response.data.album.total_tracks);
                setArtistName(response.data.artists[0].name);
                setAlbumName(response.data.album.name);
                setPopularity(response.data.popularity);
                setError(null);

                const song = { trackName: response.data.name,
                    totalTracks: response.data.album.total_tracks,
                    artistName: response.data.artists[0].name,
                    albumName: response.data.album.name,
                    popularity: response.data.popularity };
                console.log(JSON.stringify(song));
                const fetchResponse = await fetch('http://localhost:4000/api/songs', {
                    method: 'POST',
                    body: JSON.stringify(song),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await fetchResponse.json();
                if (!fetchResponse.ok) {
                    setError(json.error);
                }
                if (fetchResponse.ok) {
                    setUrl('');
                    setError(null);
                    console.log('new song added', json);
                    window.location.reload()
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Please enter a valid URL');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Song</h3>
            <label> Spotify URL: </label>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}/>
            <button type="submit">Search Song</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};


export default SongForm;
