import './styles/style.css';
import UIScrapingPanel from "./UIScrapingPanel";



document.getElementById('scrap-form')
    .addEventListener('click', e => {
        if (e.target.classList.contains('scrap')) {
            const url = document.getElementById('inputUrl').value;
            console.log(url);
            const uiScrapingPanel = new UIScrapingPanel();
            uiScrapingPanel.renderScrapSong(url);
        }
        e.preventDefault();
    });


document.getElementById("inputUrl")
    .addEventListener('keyup', e => {
        const uiScrapingPanel = new UIScrapingPanel();
        if(e.target.value != [])
            uiScrapingPanel.validateUrl(e.target.value);
    });

document.getElementById('btn-group-scrap')
    .addEventListener('click', e => {

        if (e.target.id == 'songChordScrap' || e.target.id == 'songScrap' ) {

            const div1 = document.getElementById(e.target.id + '-card');
            div1.className = e.target.id + '-card col-md-6 d-none d-lg-block';
            const div2 = document.getElementById(e.target.name + '-card');
            div2.className = e.target.name + '-card col-md-6';

            const label1 = document.getElementById('label-' + e.target.name);
            label1.className = 'btn btn-info active'
            const label2 = document.getElementById('label-' + e.target.id);
            label2.className = 'btn btn-info'

            e.preventDefault();
        }

    });