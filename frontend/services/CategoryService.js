class CategoryService {
    constructor() {
        this.URI = 'http://localhost:3000/api/category';
     //   this.URI = '/api/category';
    }

    async getCategories() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const categories = await response.json()
        return categories;
    }

    async getCategory(categoryId) {
        const response = await fetch(`${this.URI}/${categoryId}`, {

        });
        const category = await response.json();
        return category;
    }

/*    async postLyricPublish(lyricPub) {
        console.log(song, 'ANTES LOG');
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: lyricPub
        });
        return await reponse.json();
        console.log(data, 'DESPUES LOG');
    }

    async deleteLyricPublish(lyricPubId) {
        const response = await fetch(`${this.URI}/${lyricPubId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }*/

}
export default CategoryService;