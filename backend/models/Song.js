const {Schema, model} = require('mongoose');

const SongSchema = new Schema({
    title: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre', required: false}],
    lyric: {type: Schema.Types.ObjectId, ref: 'Lyric', required: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Song',SongSchema);