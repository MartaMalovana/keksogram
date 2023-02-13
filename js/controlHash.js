const inputHash = document.querySelector('.text__hashtags');


export default function controlHash () {
    inputHash.addEventListener('input', (e) => {
        const reg = new RegExp('^#{1}[1-90a-zA-Z]{1,19}$');
        const value = e.target.value.trim().toLowerCase();
        const hashes = value.split(/\s{1,}/);

        // Перевірка хештегів на правильність написання
        const symbolsCheck = (() => {
            const result = hashes.map(hash => {
                return reg.test(hash);
            });
            return result.includes(false) ? false : true;
        })();

        // Перевірка хештегів на повторюваність
        const copyHashCheck = (() => {
            if (hashes.length !== new Set(hashes).size) {
                return true;
            } else return false;
        })();
        
        // Перевірка кількості шехтегів
        const quantityCheck = (() => {
            return hashes.length < 6 && hashes.length > 0;
        })();

        // Виведення повідомлень про помилку
        if (!symbolsCheck) {
            inputHash.setCustomValidity('Хештег повинен починатись із символу #, і може містити лише літери та числа. Максимальна кількість символів - 20, включаючи #.');
        } else if (copyHashCheck) {
            inputHash.setCustomValidity('Хештеги не повинні повторюватись (регістр літер не має значення)');
        } else if (!quantityCheck) {
            inputHash.setCustomValidity('Максимум 5 хештегів');
        } else {
            inputHash.setCustomValidity('');
        }
        inputHash.reportValidity();

        if (!symbolsCheck || copyHashCheck || !quantityCheck) {
            document.querySelector('.text__hashtags:focus').style.outline = '2px solid red';
            inputHash.style.borderColor = 'red';
        } else {
            document.querySelector('.text__hashtags:focus').style.outline = '2px solid #2df12d';
            inputHash.style.borderColor = '#2df12d';
        };
    });
};