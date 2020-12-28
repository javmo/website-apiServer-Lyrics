import './styles/style.css';
import UISongBook from "./UISongBook";




//evento que carga antes datos
document.addEventListener('DOMContentLoaded', () => {
    const uiSongBook = new UISongBook();

    uiSongBook.renderCategory();
    uiSongBook.renderCategory2();
    // se setea 1 seg de delay para darle tiempo a la carga
    setTimeout(function (){ uiSongBook.renderSongBook()},1000);
    setTimeout(function (){ document.querySelector(".preloader").style.display = "none" },1000);

});

document.getElementById('btn-update')
    .addEventListener('click', e => {
        if (e.target.classList.contains('update'))
            javascript:window.location.reload();

        e.preventDefault();
    });