const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');


export default function closeBigPicture () {

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
};