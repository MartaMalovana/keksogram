export default function getServerData () {
    let serverData = [];
    for (let i = 1; i < 26; i++) {
        const data = {
            "id": i,
            "photo": i,
            "description": "Тестим новую камеру! =)",
            "likes": (Math.floor(Math.random() * (550 - 5)) + 5),
            "comments": [
                {
                    "text": "Мега фото! Просто очманіти. Як вам так удалося?",
                    "name": "Mark",
                    "avatar": "4.svg"
                },
                {
                    "text": "Так це фотошоп!!!!!!!!",
                    "name": "Alex",
                    "avatar": "3.svg"
                },
                {
                    "text": "Немає слів!!! Яка краса )))",
                    "name": "Тарас",
                    "avatar": "6.svg"
                },
                {
                    "text": "Кольори супер! Шо за камера?!",
                    "name": "Аліна",
                    "avatar": "1.svg"
                },
                {
                    "text": "Гарно же як...",
                    "name": "Ivan",
                    "avatar": "2.svg"
                },
                {
                    "text": "Життя - гарна штука, як не крути!",
                    "name": "Орест",
                    "avatar": "5.svg"
                },
                {
                    "text": "Непогано-непогано...)))))))))",
                    "name": "Надія",
                    "avatar": "6.svg"
                },
                {
                    "text": "Фотографу - респект, вдало впіймав кадр!",
                    "name": "Mark",
                    "avatar": "3.svg"
                }
            ]
        };
        serverData.push(data);
    };
    return serverData;
}