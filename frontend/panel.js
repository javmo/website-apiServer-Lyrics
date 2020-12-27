import './styles/style.css';
import UIPanel from './UIPanel';
const songService = new SongService();

import SongService from "./services/SongService";
import LyricsPublish from "./models/LyricsPublish";






//evento que carga antes datos
 document.addEventListener('DOMContentLoaded', () => {
    const uiPanel = new UIPanel();
    uiPanel.renderLyricPub();
});

document.querySelector("#search-songs")
    .addEventListener('keyup', e => {
        const uiPanel = new UIPanel();
        if(e.target.value != [])
            uiPanel.displayMatches(e);
    });


// Formulario de alta cancion
document.getElementById('search-content')
    .addEventListener('click', e => {
        if (e.target.classList.contains('publish')) {
            console.log('entra puiblish');
            const songId = e.target.getAttribute('_id');
            const categoryId = document.getElementById('exampleSelect1-' + songId)
                .selectedOptions[0].value;

            const lyricPub = new LyricsPublish(songId,categoryId);
            const uiPanel = new UIPanel();
            uiPanel.addANewLyricPub(lyricPub.toJson());
            uiPanel.renderMessage('Lyric Published', 'success', 3000);

        }
        e.preventDefault();
    });

document.getElementById('lyricPub-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const uiPanel = new UIPanel();
            uiPanel.unpublishLyric(e.target.getAttribute('_id'));
            uiPanel.renderMessage('Lyric unpublished', 'danger', 2000);
        }
        else if(e.target.classList.contains('update')) {
            const uiPanel = new UIPanel();
            const lyricPubId = e.target.getAttribute('_id');
            const newCategory = document.getElementById('selectUpdate-' + lyricPubId)
                .selectedOptions[0].value;

            uiPanel.updateLyricPubCategory(lyricPubId, newCategory);
            uiPanel.renderMessage('Lyric updated', 'success', 2000);


        }
        e.preventDefault();
    });
