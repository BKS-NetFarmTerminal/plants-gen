const fs = require('fs');
const path = require('path');
const bmp = require('bmp-js');
const sharp = require('sharp'); // Добавляем библиотеку масштабирования
const colorScheme = require('./colorScheme');
const { getRandomRGB } = require('../../randomNum');

// Установите библиотеку: npm install sharp

async function genImg() {
    const palette = {};

    for (const key in colorScheme.default) {
        palette[key] = getRandomRGB();
    }

    // 1. Чтение и декодирование BMP
    const inputBuffer = fs.readFileSync(path.join(__dirname, 'img.bmp'));
    const bmpData = bmp.decode(inputBuffer);
    const pixels = bmpData.data;

    // 2. Обработка пикселей
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        for (const key in colorScheme.default) {
            const [targetR, targetG, targetB] = colorScheme.default[key];
            if (r === targetR && g === targetG && b === targetB) {
                pixels[i - 1] = palette[key][0];     // Red
                pixels[i] = palette[key][1]; // Green
                pixels[i + 1] = palette[key][2]; // Blue
            }
        }
    }

    // 3. Создаем PNG с увеличением в 5 раз
    const pngBuffer = await sharp(Buffer.from(pixels), {
        raw: {
            width: bmpData.width,
            height: bmpData.height,
            channels: 4
        }
    })
        .resize({
            width: bmpData.width * 10,
            height: bmpData.height * 10,
            kernel: sharp.kernel.nearest // Сохраняет пиксельную графику
        })
        .toFormat('png')
        .toBuffer();

    // console.log('Изображение увеличено в 5 раз!');
    return pngBuffer;
}

exports.genImg = genImg;