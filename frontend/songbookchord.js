import './styles/style.css';
import UISongBookChord from "./UISongBookChord";




//evento que carga antes datos
document.addEventListener('DOMContentLoaded', () => {
    const uiSongBookChord = new UISongBookChord();

    uiSongBookChord.renderCategory()
        .then(resolve => {
            return uiSongBookChord.renderCategory2();
        })
        .then(resolve => {
            return uiSongBookChord.renderSongBook();
        })
        .then(function (){ document.querySelector(".preloader").style.display = "none" });
});


document.getElementById('btn-update')
    .addEventListener('click', e => {
        if (e.target.classList.contains('update'))
            javascript:window.location.reload();

        e.preventDefault();
    });