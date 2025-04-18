const express = require('express');
const beet = require('./src/gen/beet');
const carrot = require('./src/gen/carrot');

const PORT = 1488;
const app = express();

app.get('/beet', (req, res) => {
    res.status(200).json('sdgsdg')
})

app.get('/carrot', (req, res) => {
    res.status(200).json('sdgsdg')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

carrot.genImg()