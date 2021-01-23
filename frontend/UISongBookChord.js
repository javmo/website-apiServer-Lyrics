import SongService from "./services/SongService";
import CategoryService from "./services/CategoryService";
import LyricPublishService from "./services/LyricPublishService";
import LyricChordService from "./services/LyricChordService";

const lyricChordService = new LyricChordService();
const songService = new SongService();
const categoryService = new CategoryService();
const lyricPubService = new LyricPublishService()

class UISongBookChord {

    async renderCategory() {
        const categories = await categoryService.getCategories();
        const songsBookContainer = document.getElementById('songsBook-card');

        songsBookContainer.innerHTML = '';
        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'card text-white bg-secondary mb-3';
            div.id = 'card-category-'+ category._id;

            songsBookContainer.appendChild(div);
        })
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }

    async renderCategory2() {
        const categories = await categoryService.getCategories();

        categories.forEach(category => {
            const songsBookContainer = document.getElementById('card-category-' + category._id);
            songsBookContainer.innerHTML = '';
            const div = document.createElement('div');
            div.className = 'card-header';
            div.id = 'header-category-'+ category._id;
            div.innerHTML = `
            ${ category.categoryType } <h2>(ORDEN: ${ category.order })</h2>
            `
            songsBookContainer.appendChild(div);

            const div2 = document.createElement('div');
            div2.className = 'card-body';
            div2.id = 'body-category-'+ category._id;
            songsBookContainer.appendChild(div2);
        })
        return new Promise((resolve, reject) => {
            resolve(true)
        });

    }

    async renderSongBook() {
        const lyricsPub = await lyricPubService.getLyricsPublish();

        lyricsPub.forEach( async (lyricPub) => {
            const categoryContainer = document.getElementById('body-category-' + lyricPub.category);
            if(categoryContainer != null) {
                categoryContainer.innerHTML = '';

                const song = await songService.getSong(lyricPub.song);
                const lyricChord = await lyricChordService.getLyricChordBySong(lyricPub.song);


                const textHtml = ``+ lyricChord.text ;

                const div = document.createElement('div');
                div.className = '';
                div.id = 'card-category-'+ lyricChord._id;
                div.innerHTML = `
                <h4 class="card-title" id="song-title-${lyricChord._id}">${song.title}</h4>
                `
                    + textHtml
                ;
                categoryContainer.appendChild(div);
            }
        })
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }


    async renderCategory3() {
        const categories = await categoryService.getCategories();

        categories.forEach(category => {
            const songsBookContainer = document.getElementById('card-category-' + category._id);
            songsBookContainer.innerHTML = '';
            const div = document.createElement('div');
            div.className = 'card-header';
            div.id = 'header-category-'+ category._id;
            div.innerHTML = `
            ${ category.categoryType }
            `
            songsBookContainer.appendChild(div);

            const div2 = document.createElement('div');
            div2.className = 'card-body';
            div2.id = 'body-category-'+ category._id;
            songsBookContainer.appendChild(div2);

        })
    }

}

export default UISongBookChord;