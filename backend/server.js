require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const songRoutes = require('./routes/songs');
mongoose.connect(process.env.MONGO_URI)

const cors = require('cors');




const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/songs', songRoutes);
app.use((req, res, next) => {
    next();
})

var axios = require('axios');

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var accessToken = '';

var authOptions = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  data: 'grant_type=client_credentials'
};

axios(authOptions)
  .then(function (response) {
    accessToken = response.data.access_token; 
    console.log('Access Token:', accessToken);

    var trackId = '4Sav8RLaXMBpTZX6xNPj0K';
    var apiUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
  
    var config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
  
    return axios.get(apiUrl, config);
  })
  .then(function (response) {
    console.log('Track Response:', response.data);
  })
  .catch(function (error) {
    console.error('Error:', error);
  });



const PORT = process.env.PORT || 4000; 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
    





