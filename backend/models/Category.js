const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    categoryType: {
        type: String,
        // todo agregar orden a las cateogrias 
        enum: ['ENTRADA', 'SALIDA', 'POST', 'PERDON', 'COMUNION', 'GLORIA', 'ALELUYA', 'OFRENDAS'],
        default: 'ENTRADA'},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Category',CategorySchema);