const {Schema, model} = require('mongoose');

const LyricChordSchema = new Schema({
    song: {type: Schema.Types.ObjectId, ref: 'Song', unique: true, required: true},
    text: {type: String, required: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('LyricChord',LyricChordSchema);