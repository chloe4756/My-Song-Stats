const Song = require('../models/songModel');
const mongoose = require('mongoose');

const getSongs = async (req, res) => {
    const songs = await Song.find({}).sort({createdAt: -1});
    res.status(200).json(songs);
}

const getSong = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song'});
    }
    const song = await Song.findById(id);
    if(!song) {
        return res.status(404).json({error: 'No such song'});
    }

    res.status(200).json(song);
}

const createSong = async(req, res) => {
    const {trackName, totalTracks, artistName, albumName, popularity} = req.body;
    try {
        const song = await Song.create({ trackName, totalTracks, artistName, albumName, popularity });
        res.status(200).json(song);
    } catch  (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteSong = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song'});
    }
    const song = await Song.findOneAndDelete({_id: id});

    if(!song) {
        return res.status(404).json({error: 'No such song'});
    }
    res.status(200).json(song);
}



module.exports = {
    getSongs,
    getSong,
    createSong,
    deleteSong
}