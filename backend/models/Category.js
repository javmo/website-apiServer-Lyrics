const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    categoryType: {
        type: String,
        // todo agregar orden a las cateogrias 
        enum: ['ENTRADA', 'PERDON',  'GLORIA', 'ALELUYA', 'OFRENDAS', 'CONSAGRACION', 'SANTOS/CORDEROS', 'COMUNION','POST-COMUNION', 'SALIDA'],
        default: 'ENTRADA'},
    order: {type: Number, default: 99},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Category',CategorySchema);