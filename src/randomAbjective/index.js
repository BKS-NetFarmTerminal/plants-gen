const fs = require('fs');
const path = require('path');

// Путь к файлу с прилагательными
const adjectivesPath = path.join(__dirname, 'adjective.json');

// Загружаем прилагательные один раз при старте приложения
const adjectives = JSON.parse(fs.readFileSync(adjectivesPath, 'utf-8'));

function getRandomAdjective() {
    // Генерируем случайный индекс
    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
}

// Пример использования
console.log(getRandomAdjective()); // Выведет случайное прилагательное

module.exports = getRandomAdjective;