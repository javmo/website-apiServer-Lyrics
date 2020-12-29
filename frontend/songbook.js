import './styles/style.css';
import UISongBook from "./UISongBook";




//evento que carga antes datos
document.addEventListener('DOMContentLoaded', () => {
    const uiSongBook = new UISongBook();

/*    uiSongBook.renderCategory()
        .then(uiSongBook.renderCategory2()
            .then(uiSongBook.renderSongBook()
                .then(console.log('finpromesas'))))
        .catch(function (err) {
            console.log('promesa no cumplida')
        })*/


    uiSongBook.renderCategory()
        .then(resolve => {
            return uiSongBook.renderCategory2();
        })
        .then(resolve => {
            return uiSongBook.renderSongBook();
        })
        .then(function (){ document.querySelector(".preloader").style.display = "none" });
});

document.getElementById('btn-update')
    .addEventListener('click', e => {
        if (e.target.classList.contains('update'))
            javascript:window.location.reload();

        e.preventDefault();
    });