class LyricChordService {
    constructor() {
        //  this.URI =  'http://localhost:3000/api/lyricschord';
        this.URI =  '/api/lyricschord';
    }

/*    async getLyrics() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const lyric = await response.json()
        return lyric;
    }*/

    async getLyricChordBySong(songId) {
        const response = await fetch(`${this.URI}/bysongid?songId=${songId}`, {

        });
        const lyricChord = await response.json();
        return lyricChord;
    }

 /*   async postLyric(lyric) {
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
    }*/

}
export default LyricChordService;