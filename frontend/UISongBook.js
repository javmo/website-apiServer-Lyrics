import SongService from "./services/SongService";
import CategoryService from "./services/CategoryService";
import LyricPublishService from "./services/LyricPublishService";
const lyricService = new LyricService();
import UI from "./UI";
import LyricService from "./services/LyricService";

const songService = new SongService();
const categoryService = new CategoryService();
const lyricPubService = new LyricPublishService()

class UISongBook {

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
            ${ category.categoryType }
            `
            songsBookContainer.appendChild(div);

            const div2 = document.createElement('div');
            div2.className = 'card-body';
            div2.id = 'body-category-'+ category._id;
            songsBookContainer.appendChild(div2);



        })
    }

    async renderSongBook() {
        const lyricsPub = await lyricPubService.getLyricsPublish();

        lyricsPub.forEach( async (lyricPub) => {
            const categoryContainer = document.getElementById('body-category-' + lyricPub.category);
            if(categoryContainer != null) {
                categoryContainer.innerHTML = '';

                const song = await songService.getSong(lyricPub.song);
                const lyric = await lyricService.getLyric(song.lyric);


                const textHtml = ``+ lyric.text ;

                const div = document.createElement('div');
                div.className = '';
                div.id = 'card-category-'+ lyricPub._id;
                div.innerHTML = `
                <h4 class="card-title" id="song-title-${lyricPub._id}">${song.title}</h4>
                `
                + textHtml
                ;
                categoryContainer.appendChild(div);
            }

        })
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

export default UISongBook;