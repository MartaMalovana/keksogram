import getServerData from "./getServerData.js";
import { errorCloseByEsc, errorCloseByClick } from './closeErrorMessage.js';
import showPicturesMainPage from "./showPicturesMainPage.js";
import showBigPicture from "./showBigPicture.js";
import closeBigPicture from "./closeBigPicture.js";
import settingsToDefault from "./settingsToDefault.js";
import getEffect from "./getEffect.js";
import closeEditForm from "./closeEditForm.js";
import controlScale from "./controlScale.js";
import getSlider from "./getSlider.js";
import controlHash from "./controlHash.js";
import controlComment from "./controlComment.js";
import closeSuccessMessage from "./closeSuccessMessage.js";
import getFilters from "./getFilters.js";

(() => {

    let serverData = [];

    const body = document.querySelector('body');
    const inputUpload = document.getElementById('upload-file');
    const picturesSection = document.querySelector('.pictures');
    const filtersContainer = document.querySelector('.img-filters');

    // Відображає зображення інших користувачів
    const promise = new Promise(async (resolve, reject) => {
        const result = await fetch("http://localhost:3000/photos");
        if(result.ok) return resolve(result.json());
        return reject(error);
    });

    promise
        .then(data => {
            showPicturesMainPage(data.data.result);
            serverData = data.data.result;
            return serverData;
        })
        .then(() => {
            // Фільтрування зображень
            getFilters(serverData);
            filtersContainer.classList.remove('img-filters--inactive');
        })
        .catch((error) => {
            console.log(error);
            // Виведення повідомлення про помилку відповіді сервера
            const cloneError = document.getElementById('error').content.cloneNode(true);
            cloneError.querySelector('h2').textContent = 'СЕРВЕР НЕ ВІДПОВІДАЄ';
            cloneError.querySelector('button').textContent = 'ОК';
            body.appendChild(cloneError);
            // Закриття повідомлення про помилку
            cloneError.addEventListener('click', errorCloseByClick);
            body.addEventListener('keydown', errorCloseByEsc);
            document.querySelector('.error__button').addEventListener('click', errorCloseByClick);
        });


    // Виводить повноекранне зображення при натисненні на мініатюру
    picturesSection.addEventListener('click', (e) => showBigPicture(e, serverData));

    // Вихід із повноекранного зображення
    closeBigPicture();

    // Завантажити нове фото
    inputUpload.addEventListener('change', saveImg);

    function saveImg(e) {
        if (!inputUpload.files[0]) {
            return;
        };

        const editForm = document.querySelector('.img-upload__overlay');
        const imgPreview = document.querySelector('.img-upload__preview img');
        const effects = document.querySelector('.effects__list');
        const form = document.getElementById('upload-select-image');
        const success = document.querySelector('#success');
        const errorMessage = document.getElementById('error');

        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onload = function(event) {
            imgPreview.src = event.target.result;
          };
        reader.readAsDataURL(selectedFile);

          // Відкрити форму для редагування фото 
        editForm.classList.remove('hidden');
        body.classList.add('modal-open');

        // Закрити форму для редагування фото 
        closeEditForm();

        // Змінити value масштабу при натисненні на кнопки - / + і scale зображення
        controlScale();

        // Налаштування ефектів на зображення
        effects.addEventListener('click', getEffect);
        getSlider();

        // Хеш-теги
        controlHash();

        // Коментар до зображення
        controlComment();

        // Надсилання даних при submit форми
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Створення promise із fetch для надсилання даних із форми на сервер
    
            const promise = new Promise(async (resolve, reject) => {
                try {
                    console.log(e.target.elements);
                    let formData = new FormData();                        
                    formData.append("effect", e.target.elements[name="effect"].value);
                    formData.append("scale", e.target.elements[name="scale"].value);
                    formData.append("effect-level", e.target.elements[name="effect-level"].value);
                    formData.append("hashtags", e.target.elements[name="hashtags"].value);
                    formData.append("description", e.target.elements[name="description"].value);
                    formData.append("image", e.target.elements[name="filename"].files[0]);
        
                    const result = await fetch("http://localhost:3000/photos/new", {
                        method: "POST",
                        body: formData,
                    });

                    if(result.ok) return resolve(result.json());
                    if(!result.ok) return reject(error);
                } catch (error) {
                    return reject(error);
                };
            });

            promise
                .then(() => {
                    settingsToDefault();
                    inputUpload.value = '';
                })
                .then(() => {
                    const cloneSuccess = success.content.cloneNode(true);
                    body.appendChild(cloneSuccess);
                    // Закриття повідомлення про успішне надсилання даних з форми
                    closeSuccessMessage();
                })
                .catch(error => {
                    settingsToDefault();
                    const cloneError = errorMessage.content.cloneNode(true);
                    body.appendChild(cloneError);
                    // Закриття повідомлення про помилку надсилання даних з форми
                    document.addEventListener('click', errorCloseByClick);
                    body.addEventListener('keydown', errorCloseByEsc);
                });
        });
    };


})();