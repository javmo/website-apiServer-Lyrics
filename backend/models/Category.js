const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    categoryType: {
        type: String,
        default: 'ENTRADA'},
    order: {type: Number, default: 99},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Category',CategorySchema);