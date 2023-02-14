import getEffect from "./getEffect.js";

const body = document.querySelector('body');
const inputHash = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const imgPreviewBox = document.querySelector('.img-upload__preview');
const scaleInput = document.querySelector('.scale__control--value');
const editForm = document.querySelector('.img-upload__overlay');

// Скидання налаштувань редагування зображення та закриття поля для редагування
export default function settingsToDefault() {
    if (document.querySelector('.effects__radio:checked') !== document.querySelector('.effect-none')) {
        document.querySelector('.effects__radio:checked').checked = false;
        document.getElementById('effect-none').checked = true;
    };
    getEffect();

    inputHash.value = '';
    inputHash.style.borderColor = 'grey';

    comment.value = '';
    comment.style.borderColor = 'grey';

    imgPreviewBox.style.transform = 'scale(1)';
    scaleInput.value = '100%';

    editForm.classList.add('hidden');
    body.classList.remove('modal-open');
};
