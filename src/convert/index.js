const Jimp = require('jimp');
require('@jimp/bmp');
async function convertBmpToPng(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath); // ✅ Правильный вызов
        await image.writeAsync(outputPath);
        console.log('Конвертация завершена!');
    } catch (err) {
        console.error('Ошибка:', err);
    }
}

exports.convertBmpToPng = convertBmpToPng;