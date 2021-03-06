const Category = require('../models/Category');

// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getCategories = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const categories = await Category.find().sort({ order: "asc"});
    res.json(categories);
};

const createCategory = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    const newCategory = new Category({
        categoryType: req.body.categoryType,
        order: req.body.order
    });
    await newCategory.save();
    res.json({'message': 'Category Saved'});
}

const getCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category == null)
        res.json({title: '[Category NOT FOUND]'});
    else
        res.json(category);
};

const updateCategory = async (req, res) => {
    const result = await Category.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
    res.json(result);
};

const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({'message': 'Category  deleted'});
};




module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
/*    likeSongs,*/
}

