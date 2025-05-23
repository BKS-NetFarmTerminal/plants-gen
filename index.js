const express = require('express');
const beet = require('./src/gen/beet');
const carrot = require('./src/gen/carrot');
const chicken = require('./src/gen/chicken');


const gitImgPush = require('./src/gitImgPush');
const randomAbjective = require('./src/randomAbjective');

const { randomHash } = require('./src/randomHash')

const PORT = 1488;
const app = express();

require('dotenv').config();

const apiList = {
    beet,
    carrot,
    chicken
}

async function main(imageName, apiName) {
    try {
        const imageBuffer = await apiList[apiName].genImg(); // Ждём завершения
        await gitImgPush.commitAndPush(imageBuffer, `${imageName}.png`);
        return `${process.env.IMG_URL_SAMPLE}${imageName}.png`
    } catch (error) {
        console.error('Main error:', error);
        throw error;
    }
}

// Запуск

app.get('/beet', async (req, res) => {
    try {
        const imgName = randomHash();
        const url = await main(imgName,'beet');
        const name = `${randomAbjective()} ${randomAbjective()}`

        res.status(200).json({ url, name });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.get('/carrot', async (req, res) => {
    try {
        const imgName = randomHash();
        const url = await main(imgName,'carrot');
        const name = `${randomAbjective()} ${randomAbjective()}`

        res.status(200).json({ url, name });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.get('/chicken', async (req, res) => {
    try {
        const imgName = randomHash();
        const url = await main(imgName,'chicken');
        const name = `${randomAbjective()} ${randomAbjective()}`

        res.status(200).json({ url, name });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

