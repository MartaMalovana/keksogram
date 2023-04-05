const picture = document.getElementById('picture');
const picturesSection = document.querySelector('.pictures');

export default function showPicturesMainPage(data) {
    let cards = [];
    
    data.map(item => {
        const pictureContainer = picture.content.cloneNode(true);
        pictureContainer.querySelector('img').src = `http://localhost:3000/${item.photo}`;
        pictureContainer.querySelector('img').setAttribute('id', item.id);
        pictureContainer.querySelector('.picture__comments').textContent = `${item.comments.length}`;
        pictureContainer.querySelector('.picture__likes').textContent = `${item.likes}`;

        const newPictureContainer = document.createElement('div');
        newPictureContainer.style.position = 'relative';
        newPictureContainer.classList.add('picture');
        
        const a = pictureContainer.querySelector('img').cloneNode(true);
        const b = pictureContainer.querySelector('.picture__info').cloneNode(true);

        newPictureContainer.append(a, b);

        cards.push(newPictureContainer);
    });

    picturesSection.append(...cards);
};
