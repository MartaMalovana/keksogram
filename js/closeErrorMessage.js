const body = document.querySelector('body');

export function errorCloseByEsc(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        removeError();
    };
};

export function errorCloseByClick(e) {
    if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SECTION') {
        removeError();
    };
};

function removeError() {
    document.querySelector('.error').remove();
    document.removeEventListener('click', errorCloseByClick);
    body.removeEventListener('keydown', errorCloseByEsc);
};

