const body = document.querySelector('body');


export default function closeSuccessMessage () {
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

};