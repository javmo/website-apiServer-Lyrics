import UICategoryABM from "./UICategoryABM";
import Category from "./models/Category";




document.addEventListener('DOMContentLoaded', () => {
    const ui = new UICategoryABM();
    ui.renderCategories();

});

document.getElementById('category-form')
    .addEventListener('submit', e => {
        const categoryType = document.getElementById('categoryType').value;
        const order = document.getElementById('categoryOrder').value;


        const ui = new UICategoryABM();
        const category = new Category(categoryType, order);


        ui.addANewCategory(category.toJson());
        ui.renderMessage('New Song Category', 'success', 3000);


        e.preventDefault();

    });

document.getElementById('category-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const ui = new UICategoryABM();
            ui.deleteCategory(e.target.getAttribute('_id'));
            ui.renderMessage('Lyric unpublished', 'danger', 2000);
        }
        else if(e.target.classList.contains('update')) {
            const ui = new UICategoryABM();
            const categoryId = e.target.getAttribute('_id');
            const newCategory = document.getElementById('orderCategory-' + categoryId).value;

            ui.updateCategory(categoryId, newCategory);

            ui.renderMessage('Category updated', 'success', 2000);

        }
        e.preventDefault();
    });