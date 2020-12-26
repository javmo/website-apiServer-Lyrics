const {Schema, model} = require('mongoose');

const LyricSchema = new Schema({
    text: {type: String, required: true}
});

module.exports = model('Lyric',LyricSchema);