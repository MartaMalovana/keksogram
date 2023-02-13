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

(() => {

    const serverData = getServerData();

    const body = document.querySelector('body');
    const inputUpload = document.getElementById('upload-file');
    const picturesSection = document.querySelector('.pictures');
    const filtersContainer = document.querySelector('.img-filters');
    const filters = document.querySelector('.img-filters__form');

    // Відображає зображення інших користувачів
    const promise = new Promise(async (resolve, reject) => {
        return resolve('ok');
        // return reject('error');
    });

    promise
        .then(() => {
            showPicturesMainPage(serverData);
        })
        .then(() => {
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
    picturesSection.addEventListener('click', showBigPicture);

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
            const formData = new FormData(form);                        

            // Створення promise із fetch для надсилання даних із форми на сервер
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const result = await fetch(e.target.action, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData,
                    });

                    if(result.ok) return resolve(result);
                    if(!result.ok) return reject(error);
                } catch (error) {
                    return reject(error);
                }
            });

            promise
                .then(() => {
                    settingsToDefault();
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
                    function errorCloseByEsc(e) {
                        if (e.key === 'Escape' || e.key === 'Esc') {
                            removeError();
                        };
                    };
                    function errorCloseByClick(e) {
                        if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SECTION') {
                            removeError();
                        };
                    };
                    function removeError() {
                        document.querySelector('.error').remove();
                        document.removeEventListener('click', errorCloseByClick);
                        body.removeEventListener('keydown', errorCloseByEsc);
                    };
                });
        });
    };

    // Фільтрування зображень
    filters.addEventListener('click', (e) => {
        if (!serverData) return;

        // Випадкові 10 зображень
        const picturesQuantity = serverData.length;
        let randomPictures = [];
        const indexes = myRandomInts(10, picturesQuantity - 1);
        indexes.map((el) => {
            randomPictures.push(serverData[el]);
        });

        function myRandomInts(quantity, max) {
            const set = new Set();
            while (set.size < quantity) {
                set.add(Math.floor(Math.random() * max) + 1)
            };
            return [...set];
        };

        if (e.target.id === 'filter-random') {
            changePicturesByFilter(randomPictures);
        };

        // Обговорювані зображення
        let discussedPictures = [...serverData].sort((a, b) => a.likes - b.likes);
        if (e.target.id === 'filter-discussed') {
            changePicturesByFilter(discussedPictures);
        };

        // За замовчуванням
        if (e.target.id === 'filter-default') {
            changePicturesByFilter(serverData);
        };

        function changePicturesByFilter(data) {
            const copyTitle = document.querySelector('.pictures__title').cloneNode(true);
            const copyUploadSection = document.querySelector('.img-upload');
            picturesSection.innerHTML = '';
            picturesSection.append(copyTitle, copyUploadSection);
            showPicturesMainPage(data);
        };
    });

})();