class ScrapingService {
    constructor() {
        //   this.URI =  'http://localhost:3000/api/scraping';
        this.URI =  '/api/scraping';
    }

    async getSongPreview(url) {
        console.log(url);
        const response = await fetch(`${this.URI}/search?url=${url}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }

    async postScrapSong(url) {
        console.log(url);
        const response = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({url: url})
        });
        return await response.json();
    }

}

export default ScrapingService;
