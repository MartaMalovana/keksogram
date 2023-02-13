import getServerData from "./getServerData.js";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsButton = document.querySelector('.comments-loader');

const serverData = getServerData();



export default function showBigPicture (e) {

    if (e.target.nodeName !== 'IMG') return;

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    commentsButton.style.visibility = 'visible';

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
    };

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
};