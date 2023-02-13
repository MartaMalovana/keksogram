export default  function getEffect() {

    const effectInput = document.querySelector('.effects__radio:checked');
    const imgPreview = document.querySelector('.img-upload__preview img');
    const slider = document.querySelector('.effect-level__slider');

    // 1) накладення ефекту на зображення
    if (imgPreview.classList.length !== 0) {
        imgPreview.classList.toggle(`effects__preview--${effectInput.value}`);
    } else {
        imgPreview.classList.add(`effects__preview--${effectInput.value}`);
    };
    if (effectInput.value === 'none') {
        imgPreview.style.filter = 'none';
        imgPreview.removeAttribute('class');
    };

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
