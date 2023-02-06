let serverData = [];
for (i = 1; i < 26; i++) {
    const data = {
        "id": i,
        "photo": i,
        "description": "Тестим новую камеру! =)",
        "likes": (Math.floor(Math.random() * (550 - 5)) + 5),
        "comments": [
            {
                "text": "Мега фото! Просто очманіти. Як вам так удалося?",
                "name": "Mark",
                "avatar": "4.svg"
            },
            {
                "text": "Так це фотошоп!!!!!!!!",
                "name": "Alex",
                "avatar": "3.svg"
            },
            {
                "text": "Немає слів!!! Яка краса )))",
                "name": "Тарас",
                "avatar": "6.svg"
            },
            {
                "text": "Кольори супер! Шо за камера?!",
                "name": "Аліна",
                "avatar": "1.svg"
            },
            {
                "text": "Гарно же як...",
                "name": "Ivan",
                "avatar": "2.svg"
            },
            {
                "text": "Життя - гарна штука, як не крути!",
                "name": "Орест",
                "avatar": "5.svg"
            },
            {
                "text": "Непогано-непогано...)))))))))",
                "name": "Надія",
                "avatar": "6.svg"
            },
            {
                "text": "Фотографу - респект, вдало впіймав кадр!",
                "name": "Mark",
                "avatar": "3.svg"
            }
        ]
    };
    serverData.push(data);
};


(() => {

    const body = document.querySelector('body');
    const inputUpload = document.getElementById('upload-file');
    const picture = document.getElementById('picture');
    const picturesSection = document.querySelector('.pictures');
    const bigPicture = document.querySelector('.big-picture');
    const bigPictureCancel = document.querySelector('.big-picture__cancel');
    const commentsButton = document.querySelector('.comments-loader');
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
        .catch(() => {
            // Виведення повідомлення про помилку відповіді сервера
            const cloneError = document.getElementById('error').content.cloneNode(true);
            cloneError.querySelector('h2').textContent = 'СЕРВЕР НЕ ВІДПОВІДАЄ';
            cloneError.querySelector('button').textContent = 'ОК';
            body.appendChild(cloneError);
            // Закриття повідомлення про помилку
            cloneError.addEventListener('click', errorCloseByClick);
            body.addEventListener('keydown', errorCloseByEsc);
            document.querySelector('.error__button').addEventListener('click', errorCloseByClick);
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

    function showPicturesMainPage(data) {
        let cards = [];
        data.map(item => {
            const pictureContainer = picture.content.cloneNode(true);
            pictureContainer.querySelector('img').src = `./photos/${item.photo}.jpg`;
            pictureContainer.querySelector('img').setAttribute('id', item.id);
            pictureContainer.querySelector('.picture__comments').textContent = `${item.comments.length}`;
            pictureContainer.querySelector('.picture__likes').textContent = `${item.likes}`;

            const newPictureContainer = document.createElement('div');
            const a = pictureContainer.querySelector('img').cloneNode(true);
            const b = pictureContainer.querySelector('.picture__info').cloneNode(true);
            newPictureContainer.append(a, b);

            cards.push(newPictureContainer);
        });
        picturesSection.append(...cards);
    };


    // Виводить повноекранне зображення при натисненні на мініатюру
    picturesSection.addEventListener('click', (e) => {
        // e.preventDefault();
        if (e.target.nodeName !== 'IMG') return;
        bigPicture.classList.remove('hidden');
        body.classList.add('modal-open');
        const selectedPhoto = serverData.find(item => item.id === Number(e.target.id));
        // Фото
        bigPicture.querySelector('img').src = `./photos/${selectedPhoto.photo}.jpg`;
        // Опис фото
        bigPicture.querySelector('.social__caption').textContent = selectedPhoto.description;
        // Кількість лайків
        bigPicture.querySelector('.likes-count').textContent = selectedPhoto.likes;
        // Кількість коментарів
        bigPicture.querySelector('.comments-count').textContent = selectedPhoto.comments.length;
        // Кількість коментарів, які відображені відразу
        let quantityShowedComments = selectedPhoto.comments.length > 5 ? 5 : selectedPhoto.comments.length;
        bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${quantityShowedComments} з `;
        // Коментарі
        let commentsContainer = [];

        selectedPhoto.comments.map(item => {
            const commentItem = document.querySelector('.social__comment').cloneNode(true);
            // Аватар
            commentItem.querySelector('img').src = `img/avatar-${item.avatar}`;
            // Ім'я користувача, який залишив відгук, у атрибуті alt  
            commentItem.querySelector('img').setAttribute('alt', `Аватар на коментарі користувача ${item.name}`);
            // Текст коментаря
            commentItem.querySelector('p').textContent = item.text;
            commentsContainer.push(commentItem);
        });
        // Перші 5 коментарів
        if (quantityShowedComments > 0) {
            const firstFiveComments = commentsContainer.filter((el, index) => index < quantityShowedComments);
            bigPicture.querySelector('.social__comments').innerHTML = '';
            bigPicture.querySelector('.social__comments').append(...firstFiveComments);
        }
        // Решта коментарів
        commentsButton.addEventListener('click', () => {
            commentsButton.style.visibility = 'visible';
            function getCommentsLeft() {
                return commentsContainer.length - quantityShowedComments;
            };
            if (getCommentsLeft() > 0) {
                const commentsLeft = commentsContainer.filter((item, index) => index >= quantityShowedComments && index < commentsContainer.length);
                const newFiveComments = commentsLeft.filter((item, index) => index < 5);
                bigPicture.querySelector('.social__comments').append(...newFiveComments);
                quantityShowedComments += newFiveComments.length;
                bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${quantityShowedComments} з `;
                if (getCommentsLeft() === 0) {
                    commentsButton.style.visibility = 'hidden';
                };
            };
        });
    });

    // Вихід із повноекранного зображення
    bigPictureCancel.addEventListener('click', closeBigPicture);
    body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeBigPicture();
        };
    });
    function closeBigPicture() {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
    };

    // Завантажити нове фото
    inputUpload.addEventListener('change', saveImg);
    let uploadedPictures = [];

    function saveImg(e) {
        if (!inputUpload.files[0]) {
            return;
        };
        const editForm = document.querySelector('.img-upload__overlay');
        const closeEditFormButton = document.getElementById('upload-cancel');
        const smallerButton = document.querySelector('.scale__control--smaller');
        const biggerButton = document.querySelector('.scale__control--bigger');
        const scaleInput = document.querySelector('.scale__control--value');
        const imgPreviewBox = document.querySelector('.img-upload__preview');
        const imgPreview = document.querySelector('.img-upload__preview img');
        const slider = document.querySelector('.effect-level__slider');
        const effects = document.querySelector('.effects__list');
        const inputHash = document.querySelector('.text__hashtags');
        const comment = document.querySelector('.text__description');
        const formData = document.getElementById('upload-select-image');
        const success = document.querySelector('#success');
        const errorMessage = document.getElementById('error');
        const labelUpload = document.querySelector('.img-upload__label');

        // Відкрити форму для редагування фото 
        editForm.classList.remove('hidden');
        body.classList.add('modal-open');

        // Закрити форму для редагування фото 
        closeEditFormButton.addEventListener('click', () => {
            settingsToDefault();
        });
        body.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                // Якщо інпут для введення хештегів - або поле для введення коментаря 
                // - у фокусі, - закриття форми не відбудеться
                if (document.activeElement === inputHash || document.activeElement === comment) return;
                settingsToDefault();
            }
        });

        // Скидання налаштувань редагування зображення та закриття поля для редагування
        function settingsToDefault() {
            if (document.querySelector('.effects__radio:checked') !== document.querySelector('.effect-none')) {
                document.querySelector('.effects__radio:checked').checked = false;
                document.getElementById('effect-none').checked = true;
            };
            getEffect();
            inputHash.value = '';
            comment.value = '';
            imgPreviewBox.style.transform = 'scale(1)';
            scaleInput.value = '100%';
            editForm.classList.add('hidden');
            body.classList.remove('modal-open');
        };

        // Змінити value масштабу при натисненні на кнопки - / + і scale зображення
        smallerButton.addEventListener('click', () => {
            changeScale('smaller');
        });
        biggerButton.addEventListener('click', () => {
            changeScale('bigger');
        });

        function changeScale(t) {
            switch (scaleInput.value) {
                case '100%':
                    scaleInput.value = t === 'smaller' ? '75%' : '100%';
                    break;
                case '75%':
                    scaleInput.value = t === 'smaller' ? '50%' : '100%';
                    break;
                case '50%':
                    scaleInput.value = t === 'smaller' ? '25%' : '75%';
                    break;
                case '25%':
                    scaleInput.value = t === 'bigger' ? '50%' : '25%';
                    break;
                default:
                    break;
            };
            imgPreviewBox.style.transform = `scale(${Number(scaleInput.value.slice(0, -1)) / 100})`;
        };

        // Налаштування ефектів на зображення
        effects.addEventListener('click', getEffect);
        noUiSlider.create(slider, {
            start: [1],
            step: 0.1,
            range: {
                'min': 0,
                'max': 1
            },
            tooltips: [
                true
            ],
            connect: 'lower'
        });
        slider.style.visibility = 'hidden';
        slider.noUiSlider.on('update', function (values, handle) {
            const effectInput = document.querySelector('.effects__radio:checked');
            const inputEffect = document.querySelector('.effect-level__value');
            switch (effectInput.value) {
                case 'chrome':
                    imgPreview.style.filter = `grayscale(${values})`;
                    break;
                case 'sepia':
                    imgPreview.style.filter = `sepia(${values})`;
                    break;
                case 'marvin':
                    imgPreview.style.filter = `invert(${values}%)`;
                    break;
                case 'phobos':
                    imgPreview.style.filter = `blur(${values}px)`;
                    break;
                case 'heat':
                    imgPreview.style.filter = `brightness(${values})`;
                    break;
                default:
                    imgPreview.style.filter = `none`;
                    break;
            };
            inputEffect.setAttribute('value', values);
        });

        function getEffect(e) {
            const effectInput = document.querySelector('.effects__radio:checked');
            // 1) накладення ефекту на зображення
            if (imgPreview.classList.length !== 0) {
                imgPreview.classList.toggle(`effects__preview--${effectInput.value}`);
            } else {
                imgPreview.classList.add(`effects__preview--${effectInput.value}`);
            };
            if (effectInput.value === 'none') {
                imgPreview.style.filter = 'none';
                imgPreview.removeAttribute('class');
            }
            // 2) зміна інтенсивності ефекту, який накладається на зображення
            switch (effectInput.value) {
                case 'chrome':
                    updateSlider('visible', 0, 1, 0.1, 1);
                    break;
                case 'sepia':
                    updateSlider('visible', 0, 1, 0.1, 1);
                    break;
                case 'marvin':
                    updateSlider('visible', 0, 100, 1, 100);
                    break;
                case 'phobos':
                    updateSlider('visible', 0, 3, 0.1, 3);
                    break;
                case 'heat':
                    updateSlider('visible', 0, 3, 0.1, 3);
                    break;
                default:
                    slider.style.visibility = 'hidden';
                    break;
            };

            function updateSlider(visibility, min, max, step, start) {
                slider.style.visibility = visibility;
                slider.noUiSlider.updateOptions({
                    range: {
                        'min': min,
                        'max': max
                    },
                    step: step,
                    start: [start]
                });
            };
        };

        // Хеш-теги
        inputHash.addEventListener('input', (e) => {
            const reg = new RegExp('^#{1}[1-90a-zA-Z]{1,19}$');
            const value = e.target.value.trim().toLowerCase();
            const hashes = value.split(/\s{1,}/);
            // Перевірка хештегів на правильність написання
            const symbolsCheck = (() => {
                const result = hashes.map(hash => {
                    return reg.test(hash);
                });
                return result.includes(false) ? false : true;
            })();
            // Перевірка хештегів на повторюваність
            const copyHashCheck = (() => {
                if (hashes.length !== new Set(hashes).size) {
                    return true;
                } else return false;
            })();
            // Перевірка кількості шехтегів
            const quantityCheck = (() => {
                return hashes.length < 6 && hashes.length > 0;
            })();

            // Виведення повідомлень про помилку
            if (!symbolsCheck) {
                inputHash.setCustomValidity('Хештег повинен починатись із символу #, і може містити лише літери та числа. Максимальна кількість символів - 20, включаючи #.');
            } else if (copyHashCheck) {
                inputHash.setCustomValidity('Хештеги не повинні повторюватись (регістр літер не має значення)');
            } else if (!quantityCheck) {
                inputHash.setCustomValidity('Максимум 5 хештегів');
            } else {
                inputHash.setCustomValidity('');
            }
            inputHash.reportValidity();

            if (!symbolsCheck || copyHashCheck || !quantityCheck) {
                document.querySelector('.text__hashtags:focus').style.outline = '2px solid red';
                inputHash.style.borderColor = 'red';
            } else {
                document.querySelector('.text__hashtags:focus').style.outline = '2px solid #2df12d';
                inputHash.style.borderColor = '#2df12d';
            };
        });

        // Коментар до зображення
        comment.addEventListener('input', (e) => {
            if (e.target.value === '') {
                return;
            };
            if (e.target.value.length <= 140) {
                document.querySelector('.text__description:focus').style.outline = '2px solid #2df12d';
                comment.style.borderColor = '#2df12d';
            };
        })

        // Надсилання даних при submit форми
        formData.addEventListener('submit', (e) => {
            e.preventDefault();

            // Створення promise із fetch для надсилання даних із форми на сервер
            const promise = new Promise(async (resolve, reject) => {

                return resolve('ok');
                // return reject('error');
            });
            promise
                .then(() => {
                    settingsToDefault();
                })
                .then(() => {
                    const cloneSuccess = success.content.cloneNode(true);
                    body.appendChild(cloneSuccess);
                    // Закриття повідомлення про успішне надсилання даних з форми
                    document.addEventListener('click', successCloseByClick);
                    body.addEventListener('keydown', successCloseByEsc);
                    function successCloseByEsc(e) {
                        if (e.key === 'Escape' || e.key === 'Esc') {
                            removeSuccess();
                        };
                    };
                    function successCloseByClick(e) {
                        if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SECTION') {
                            removeSuccess();
                        };
                    };
                    function removeSuccess() {
                        document.querySelector('.success').remove();
                        document.removeEventListener('click', successCloseByClick);
                        body.removeEventListener('keydown', successCloseByEsc);
                    };
                    // Додавання завантаженого об'єкту зображення до масиву нових завантажень
                    uploadedPictures.push({
                        "photo": ""
                    })
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