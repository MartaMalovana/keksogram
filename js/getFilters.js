import showPicturesMainPage from "./showPicturesMainPage.js";

const filters = document.querySelector('.img-filters__form');
const picturesSection = document.querySelector('.pictures');


export default function getFilters (serverData) {
    filters.addEventListener('click', _.throttle((e) => {
        console.log(serverData);
        if (!serverData) return;
        
        // Випадкові 10 зображень
        if (e.target.id === 'filter-random') {
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
    
            changePicturesByFilter(randomPictures);
        };

        // Обговорювані зображення
        if (e.target.id === 'filter-discussed') {
            let discussedPictures = [...serverData].sort((a, b) => b.likes - a.likes);

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

            document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
            e.target.classList.add('img-filters__button--active');
        };
    }, 500));
}