const {Schema, model} = require('mongoose');

const SongSchema = new Schema({
    title: {type: String, required: true},
    genre: [{type: String, required: true}],
    lyric: {type: Schema.Types.ObjectId, ref: 'Lyric', required: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Song',SongSchema);