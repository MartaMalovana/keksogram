import settingsToDefault from "./settingsToDefault.js";

const body = document.querySelector('body');
const closeEditFormButton = document.getElementById('upload-cancel');
const inputHash = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');


export default function closeEditForm () {

    closeEditFormButton.addEventListener('click', () => {
        settingsToDefault();
    });

    body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            // Якщо інпут для введення хештегів - або поле для введення коментаря 
            // - у фокусі, - закриття форми не відбудеться
            if (document.activeElement === inputHash || document.activeElement === comment) return;
            settingsToDefault();
        };
    });
};