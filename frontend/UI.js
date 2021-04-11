import  SongService from './services/SongService';
import LyricService from "./services/LyricService";
import GenreService from "./services/GenreService";
import LyricChordService from "./services/LyricChordService";
const songService = new SongService();
const lyricService = new LyricService();
const genreService = new GenreService();
const lyricChordService = new LyricChordService();

class UI {

    async renderSongs() {
        const songs = await songService.getSongs();
        const songsCardContainer = document.getElementById('songs-cards');
        songsCardContainer.innerHTML = '';
        songs.forEach( song  => {

            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
            <div class="card m-2">
            <div class="row">
            <div class="col-md-8">
            <div class="card-block px-2">
            <h4 class="card-title"> ${song.title} </h4>
            <p class="card-text" id="song-id-${song._id}"> 
            </p>
            <a href="#" class="btn btn-danger delete" _id="${song._id}">Delete</a>
            <a href="#" class="btn btn-info manage-chord" _id="${song._id}">Manage Chords</a>
            <a href="#" class="btn btn-info manage-lyric" _id="${song._id}">Manage Lyrics</a>
            </div>
            </div>
            </div>
            </div>
            `;
            songsCardContainer.appendChild(div);
        })
    }

    async renderGenre() {
        const songs = await songService.getSongs();
        songs.forEach(async (song) => {
            const songsGenreContainer = document.getElementById('song-id-' + song._id);
            songsGenreContainer.innerHTML = '';
            song.genre.forEach(async (genreId) => {
                const genre = await genreService.getGenre(genreId);
                const div = document.createElement('div');
                div.innerHTML = '';
                div.innerHTML = `
            <span class="badge badge-pill badge-success"> ${genre.name} </span>
            `;
                songsGenreContainer.appendChild(div);
            })
        })

    }

    async addANewSong(song,lyricText) {
        await songService.postSong(song);

        this.clearSongFrom();
        this.renderSongs();
    }

    clearSongFrom() {
        document.getElementById('song-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const songForm = document.querySelector('#song-form');

        container.insertBefore(div, songForm);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, secondsToRemove);

    }

    async deleteSong(songID) {
        await songService.deleteSong(songID);
        this.renderSongs();

    }

    async renderPopupChord(songId) {
        const overlay = document.getElementById('overlay'),
            popup = document.getElementById('popup'),
            popupForm = document.getElementById('popup-form');

        const song = await songService.getSong(songId);
        const lyricChord = await lyricChordService.getLyricChordBySong(songId);

        popupForm.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
        <h3>${song.title}</h3>
        <label for="exampleTextarea">Song Chords</label>
        <textarea class="form-control" id="chord-text" rows="10">${lyricChord.text}</textarea>
        <a href="#" id="create-chord" class="btn btn-success disabled" _id="${song._id}" >Create Chords</a>
        <a href="#" id="update-chord" class="btn btn-info" _id="${lyricChord._id}" >Update Chords</a>
        
        `;

        popupForm.appendChild(div);
        if (lyricChord._id == null) {
            document.getElementById('create-chord').className = 'btn btn-success';
            document.getElementById('update-chord').className = 'btn btn-info disabled';
        }

        overlay.classList.add('active');
        popup.classList.add('active');

        document.getElementById('update-chord')
            .addEventListener("click", async e => {
                lyricChord.text = document.getElementById('chord-text').value;
                await lyricChordService.updateLyricChord(lyricChord);
                overlay.classList.remove('active');
                popup.classList.remove('active');
                this.renderMessage('Chords Updated', 'success', 2000);
                e.preventDefault();
            })

        document.getElementById('create-chord')
            .addEventListener("click", async e => {
                lyricChord.text = document.getElementById('chord-text').value;
                lyricChord.song = e.target.getAttribute('_id');
                await lyricChordService.postLyric(lyricChord);
                overlay.classList.remove('active');
                popup.classList.remove('active');
                this.renderMessage('Chords created', 'success', 2000);
                e.preventDefault();
            })
    }

    async renderPopupLyric(songId) {
        const overlay = document.getElementById('overlay'),
            popup = document.getElementById('popup'),
            popupForm = document.getElementById('popup-form');

        const song = await songService.getSong(songId);
        const lyric = await lyricService.getLyric(song.lyric);

        popupForm.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
        <h3>${song.title}</h3>
        <label for="exampleTextarea">Song Lyric</label>
        <textarea class="form-control" id="lyric-text" rows="10">${lyric.text}</textarea>
        <a href="#" id="update-lyric" class="btn btn-info" _id="${lyric._id}" >Update Lyric</a>
        `;

        popupForm.appendChild(div);
        if (lyric._id == null)
            document.getElementById('update-lyric').className = 'btn btn-info disabled';


        overlay.classList.add('active');
        popup.classList.add('active');

        document.getElementById('update-lyric')
            .addEventListener("click", async e => {
                lyric.text = document.getElementById('lyric-text').value;
                await lyricService.updateLyric(lyric);
                overlay.classList.remove('active');
                popup.classList.remove('active');
                this.renderMessage('Lyrics Updated', 'success', 2000);
                e.preventDefault();
            })
    }

}

export default UI;