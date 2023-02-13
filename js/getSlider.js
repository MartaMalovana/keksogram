const slider = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');


export default function getSlider () {
    slider.style.visibility = 'hidden';

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
};