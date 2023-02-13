const comment = document.querySelector('.text__description');

export default function controlComment () {
    comment.addEventListener('input', (e) => {
        if (e.target.value.length === 0) {
            document.querySelector('.text__description:focus').style.outline = 'none';
            comment.style.borderColor = 'grey';

            return;
        };
        if (e.target.value.length <= 140) {
            document.querySelector('.text__description:focus').style.outline = '2px solid #2df12d';
            comment.style.borderColor = '#2df12d';
        };
    });
};