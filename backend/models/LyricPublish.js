
const {Schema, model} = require('mongoose');

const LyricPublishSchema = new Schema({
    song: {type: Schema.Types.ObjectId, ref: 'Song', required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('LyricPublish',LyricPublishSchema);