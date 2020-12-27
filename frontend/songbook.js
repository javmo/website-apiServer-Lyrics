import './styles/style.css';
import UISongBook from "./UISongBook";




//evento que carga antes datos
document.addEventListener('DOMContentLoaded', () => {
    const uiSongBook = new UISongBook();
    uiSongBook.renderCategory();
    uiSongBook.renderCategory2();
    uiSongBook.renderSongBook();

});

document.getElementById('btn-update')
    .addEventListener('click', e => {
        if (e.target.classList.contains('update')) {
            const uiSongBook = new UISongBook();
            if (document.querySelector('body-category-') == null) {
                uiSongBook.renderCategory2();
                uiSongBook.renderSongBook();
            }

            uiSongBook.renderSongBook();
        }
        e.preventDefault();
    });