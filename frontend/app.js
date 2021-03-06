import './styles/style.css';
import UI from './UI';
import Song from "./models/Song";
import Lyric from "./models/Lyrics";



//evento que carga antes datos
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderSongs();
    ui.renderGenre();
});

// Formulario de alta cancion
document.getElementById('song-form')
    .addEventListener('submit', e => {
        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;

        const formData = new FormData();
        formData.append('title', title);
        // todo agregar el token al momento del alta de canciones
        formData.append('genres','{}')
        formData.append('text', text);

        const ui = new UI();
        const song = new Song(title, [], new Lyric(text));


        ui.addANewSong(song.toJson());
        ui.renderMessage('New Song Added', 'success', 3000);


        e.preventDefault();

    });

document.getElementById('songs-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const ui = new UI();
            ui.deleteSong(e.target.getAttribute('_id'));
            ui.renderMessage('Song Remove', 'danger', 2000);
        } else if (e.target.classList.contains('manage-chord')) {
            const ui = new UI();
            ui.renderPopupChord(e.target.getAttribute('_id'));
        } else if (e.target.classList.contains('manage-lyric')) {
            const ui = new UI();
            ui.renderPopupLyric(e.target.getAttribute('_id'));
        }
        e.preventDefault();
    });

document.getElementById('btn-cerrar-popup')
    .addEventListener("click", e => {
        e.preventDefault();
        overlay.classList.remove('active');
        popup.classList.remove('active');
    })


