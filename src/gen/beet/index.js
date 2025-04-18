const fs = require('fs');
const path = require('path');
const bmp = require('bmp-js');
const colorScheme = require('./colorScheme');
const {getRandomRGB} = require('../../randomNum')

function genImg() {

    const palette = {}

    for (key in colorScheme.default) {
        palette[key] = getRandomRGB();
    }

// 1. Чтение BMP-файла
    const inputBuffer = fs.readFileSync(path.join(__dirname, 'img.bmp'));

// 2. Декодирование BMP
    const bmpData = bmp.decode(inputBuffer);
    const pixels = bmpData.data; // Данные в формате RGBA (по 4 байта на пиксель)

// const allColor = []

// 3. Замена черных пикселей (0,0,0) на красные (255,0,0)
    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        // добавляем все уникальные цвета в массив allColor
        // if (!allColor.some(([r,g,b]) => r == red && g == green && b == blue)) {
        //     allColor.push([red, green, blue]);
        // }


        for (key in colorScheme.default) {
            const r = colorScheme.default[key][0];
            const g = colorScheme.default[key][1];
            const b = colorScheme.default[key][2];

            if (r == red && g == green && b == blue) {
                pixels[i-1] = palette[key][0];
                pixels[i ] = palette[key][1];
                pixels[i + 1] = palette[key][2];
            }

        }
    }
// console.log(allColor)
// 4. Кодирование обратно в BMP
    const outputBuffer = bmp.encode(bmpData);

// 5. Сохранение результата
    fs.writeFileSync('output.bmp', outputBuffer.data);

// convertBmpToPng('output.bmp','output.png')
    console.log('Изображение сохранено!');
}


exports.genImg = genImg;