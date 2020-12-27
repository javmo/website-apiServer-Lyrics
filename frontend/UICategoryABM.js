import CategoryService from "./services/CategoryService";

const categoryService = new CategoryService();

class UICategoryABM {

    async renderCategories() {
        const categories = await categoryService.getCategories();
        const categoriesCardContainer = document.getElementById('category-cards');
        categoriesCardContainer.innerHTML = '';
        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
            <div class="card m-2">
            <div class="row">
            <div class="col-md-8">
            <div class="card-block px-2">
            <h4 class="card-title"> ${category.categoryType} </h4>
            <p class="card-text" id="category-id-${category._id}"> 
            </p>
            <div class="form-group">
                <label class="col-form-label col-form-label-sm" for="inputSmall">Order Category</label>
                <input class="form-control form-control-sm" type="number" placeholder="${category.order}" id="orderCategory-${category._id}">
            </div>
            <a href="#" class="btn btn-danger delete" _id="${category._id}">Delete</a>
            <a href="#" class="btn btn-success update" _id="${category._id}">Update</a>

            </div>
            </div>
            </div>
            </div>
            `;
            categoriesCardContainer.appendChild(div);
        })

    }
    async addANewCategory(category) {
        await categoryService.postCategory(category);

        this.clearCategoryFrom();
        this.renderCategories();
    }

    async deleteCategory(categoryId) {
        await categoryService.deleteCategory(categoryId)
        this.renderCategories();

    }

    async updateCategory(categoryId, newOrder) {
        const category = await categoryService.getCategory(categoryId);
        category.order = newOrder;
        await categoryService.updateCategory(category);
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const songForm = document.querySelector('#category-form');

        container.insertBefore(div, songForm);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, secondsToRemove);

    }

    clearCategoryFrom() {
        document.getElementById('category-form').reset();
    }
}

    export default UICategoryABM;