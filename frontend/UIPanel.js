import  SongService from './services/SongService';
import Lyric from "./models/Lyrics";
import LyricService from "./services/LyricService";
import GenreService from "./services/GenreService";
import CategoryService from "./services/CategoryService";
import LyricPublishService from "./services/LyricPublishService";
const songService = new SongService();
const categoryService = new CategoryService();
const lyricPubService = new LyricPublishService()
const lyricService = new LyricService();
const genreService = new GenreService();


class UIPanel {

    async loadSongs() {
       return await songService.getSongs();

    }

    async displayMatches(e) {
        const songs = await songService.searchSongLike(e.target.value);
        console.log(e.target.value);
        const suggestions = document.querySelector('#table-hover');
        const categories = await categoryService.getCategories();
        console.log(categories)

        const htmlCategory = this.inerHtmlCategories(categories);



        const html = songs.map(song => {
            const regex = new RegExp(e.target.value, 'gi');

            return `
                <tbody>
                <th scope="row">${song.title} </th> 
                <td> id# ${song._id} </td> 
                <td>
                    <select class="form-control" id="exampleSelect1-${song._id}"> 
                    <option value="" disabled selected>Select Category ...</option>
                `
                +
                htmlCategory
                +
                `
                    </select>
                </td>
                <td>
                    <button type="button" class="btn btn-success publish" _id="${song._id}">Publish</button>    
                </td>
                </tbody>
            `

        }).join('');
        suggestions.innerHTML = html;
    }

    async renderLyricPub() {

        const lyricsPub = await lyricPubService.getLyricsPublish();
        const categories = await categoryService.getCategories();
        const lyricCardContainer = document.getElementById('lyricPub-cards');

        const htmlCategory = this.inerHtmlCategories(categories);


        lyricCardContainer.innerHTML = '';
        lyricsPub.forEach( async (lyricPub)  => {
            const song = await songService.getSong(lyricPub.song);
            const categorySelected = await categoryService.getCategory(lyricPub.category);
            console.log(categorySelected);

            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
            <div class="card m-2">
            <div class="row">
            <div class="col-md-8">
            <div class="card-block px-2">
            <h4 class="card-title"> ${song.title} </h4>
            <p class="card-text" id="song-id-${lyricPub._id}"> 
            </p>
            <a href="#" class="btn btn-danger delete" _id="${lyricPub._id}">Delete</a>
            <a href="#" class="btn btn-success update" _id="${lyricPub._id}">Update</a>
                <select class="form-control-update" id="selectUpdate-${lyricPub._id}"> 
                <option value="${categorySelected._id}" selected>${categorySelected.categoryType}</option>
                `
                +
                htmlCategory
                +
                `
                </select>
            </div>
            </div>
            </div>
            </div>
            `;
            lyricCardContainer.appendChild(div);
        })
    }

    inerHtmlCategories(categories) {

       const htmlCategory = categories.map( category => {
            return `<option value="${category._id}">  ${category.categoryType}  </option>`;

        }).join('');
       return htmlCategory
    }


    async addANewLyricPub(lyricPub) {
        await lyricPubService.postLyricPublish(lyricPub);
        this.renderLyricPub();
    }

    clearSongFrom() {
        document.getElementById('song-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage}`;
        div.appendChild(document.createTextNode(message));

        const container = document.getElementById('app');
        const searchForm = document.querySelector('.row');

        container.insertBefore(div, searchForm);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, secondsToRemove);

    }

    async unpublishLyric(lyricPubId) {
        await lyricPubService.deleteLyricPublish(lyricPubId);
        this.renderLyricPub();
    }

    async updateLyricPubCategory(lyricPubId, newCategory) {
        const lyricPub = await lyricPubService.getLyricPublish(lyricPubId);

        lyricPub.category = newCategory;
        await lyricPubService.updateLyricPub(lyricPub);
    }

}

export default UIPanel;