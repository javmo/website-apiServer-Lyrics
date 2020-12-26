const {Schema, model} = require('mongoose');

const GenreSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = model('Genre',GenreSchema);