import {useEffect, useState} from 'react';

import SongDetail from '../components/SongDetail'; 
import SongForm from '../components/SongForm';

const Home = () => {
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchSongs = async() => {
            const response = await fetch('/api/songs');
            const json = await response.json();
            if (response.ok) {
                setSongs(json);
            }
        }
        fetchSongs()
    }, []);
    return (
        <div className="home">
            <div className="songs">
                {songs && songs.map((song) => (
                    <SongDetail key={song._id} song={song} />
                ))}
            </div>
            <SongForm />
        </div>
    )
}

export default Home;