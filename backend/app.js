// dotenv levanta las vartaibles de .env
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initializations
const app = express();
require('./database');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());




// routes
app.use('/api/songs', require('./routes/songs.routes'));
app.use('/api/lyrics', require('./routes/lyrics.routes'));
app.use('/api/genres', require('./routes/genres.routes'));
app.use('/api/lyricsPublish', require('./routes/lyricspublish.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/lyricschord', require('./routes/lyricschord.routes'));
app.use('/api/scraping', require('./routes/scraping.routes'));


// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;