class LyricService {
    constructor() {
      //  this.URI =  'http://localhost:3000/api/lyrics';
        this.URI =  '/api/lyrics';
    }

    async getLyrics() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const lyric = await response.json()
        return lyric;
    }

    async getLyric(lyricId) {
        const response = await fetch(`${this.URI}/${lyricId}`, {

        });
        const lyric = await response.json();
        return lyric;
    }

    async postLyric(lyric) {
        console.log(lyric, 'ANTES LOG');
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: lyric
        });
        const data = await reponse.json();
    }

    async deleteLyric(lyricId) {
        const response = await fetch(`${this.URI}/${lyricId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
    }

}
export default LyricService;