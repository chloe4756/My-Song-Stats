const express = require('express');
require('dotenv').config();
const {
    createSong,
    getSongs,
    getSong,
    deleteSong
} = require('../controllers/songController')

const router = express.Router();

router.get('/', getSongs);


router.get('/:id', getSong);

router.post('/', createSong);

router.delete('/:id', deleteSong);



const axios = require('axios');
async function getSpotifyAccessToken() {
    var client_id = process.env.CLIENT_ID;
    var client_secret = process.env.CLIENT_SECRET;

    var authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        data: 'grant_type=client_credentials'
    };

    try {
        const response = await axios(authOptions);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        return null;
    }
}

// Route to get track details
router.post('/tracks', async (req, res) => {
    try {
        const trackId = req.body.trackId;
        const accessToken = await getSpotifyAccessToken();

        if (!accessToken) {
            res.status(500).send('Error fetching access token');
            return;
        }

        const apiUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
        const config = {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        };

        const trackResponse = await axios.get(apiUrl, config);
        res.json(trackResponse.data);
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).send('Error fetching track');
    }
});

module.exports = router;
