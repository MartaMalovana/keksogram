const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreviewBox = document.querySelector('.img-upload__preview');


export default function controlScale () {
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
};