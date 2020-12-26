class Category {
    constructor(text) {
        this.categoryType = categoryType
    }

    toJson() {
        const dataJson = JSON.stringify({
            categoryType: this.categoryType
        })
        return dataJson;
    }
}

export default Category;