import LyricPublishService from "./services/LyricPublishService";
import ScrapingService from "./services/ScrapingService";
import UISongBook from "./UISongBook";
const scrapingService = new ScrapingService();


class UIScrapingPanel {

    async renderScrapSong(url) {

        const scrapSong = await scrapingService.getSongPreview(url);

        const songScrapCard = document.getElementById('songScrap-card');

        songScrapCard.innerHTML = '';
        const divSong = document.createElement('div');
        divSong.className = 'card text-white bg-success mb-3';
        divSong.innerHTML = `
        <div class="card-header">Cancion</div>
            <div class="card-body">
             <h2 class="card-title">${scrapSong.title}</h2>
             <h5 class="card-title">${scrapSong.artist}</h5>
             <p class="card-text">${scrapSong.lyric.text}</p>
         </div>
        `
        songScrapCard.appendChild(divSong);

        const songChordScrapCard = document.getElementById('songChordScrap-card');

        songChordScrapCard.innerHTML = '';
        const divChord = document.createElement('div');
        divChord.className = 'card border-success mb-3';
        divChord.innerHTML = `
        <div class="card-header">Cancion con acordes</div>
            <div class="card-body">
             <h4 class="card-title">${scrapSong.title}</h4>
             <h5 class="card-title">${scrapSong.artist}</h5>
             <p class="card-text">${scrapSong.lyricchord}</p>
         </div>
        `
        songChordScrapCard.appendChild(divChord);

    }

    validateUrl(url){
        const laCuerdaUrl = "https://acordes.lacuerda.net";
        const regex = new RegExp(laCuerdaUrl, 'gi')
        const inputUrl = document.getElementById('inputUrl');
        const validFeedback = document.getElementById('valid-feedback');
        const scrapForm = document.getElementById('scrap-form');
        const scrapbutton = document.getElementById('scrap');

        if(regex.test(url)) {
            inputUrl.className = 'form-control is-valid'
            validFeedback.className = 'valid-feedback'
            validFeedback.innerHTML = `Success! You've done it.`
            scrapForm.className = 'form-group has-success'
            scrapbutton.className = 'btn btn-success scrap'
            scrapbutton.innerHTML = 'SCRAP!'
        }
        else {
            inputUrl.className = 'form-control is-invalid'
            validFeedback.className = 'invalid-feedback'
            validFeedback.innerHTML = `Sorry, that is not a valid url.`
            scrapForm.className = 'form-group has-danger'
            scrapbutton.className = 'btn btn-warning disabled'
            scrapbutton.innerHTML = 'Oops!'
        }
    }


}
export default UIScrapingPanel;


