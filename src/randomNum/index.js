function getRandomByte() {
    return Math.floor(Math.random() * 256);
}

function getRandomRGB() {
    return [getRandomByte(),getRandomByte(),getRandomByte()]
}

exports.getRandomByte = getRandomByte;
exports.getRandomRGB = getRandomRGB;