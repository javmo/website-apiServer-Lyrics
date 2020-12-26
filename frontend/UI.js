import  SongService from './services/SongService';
import Lyric from "./models/Lyrics";
import LyricService from "./services/LyricService";
import GenreService from "./services/GenreService";
const songService = new SongService();
const lyricService = new LyricService();
const genreService = new GenreService();

class UI {

    async renderSongs() {
        const songs = await songService.getSongs();
        const songsCardContainer = document.getElementById('songs-cards');
        songsCardContainer.innerHTML = '';
        songs.forEach(song  => {
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
            <a href="#" class="btn btn-danger delete" _id="${song._id}">X</a>
            </div>
            </div>
            </div>
            </div>
            `;
            songsCardContainer.appendChild(div);
        })
        console.log(songs);
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

}

export default UI;