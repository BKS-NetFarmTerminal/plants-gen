const { v4: uuidv4 } = require('uuid');

const randomHash = () => {
    return uuidv4().replace(/-/g, '').slice(0, 12);
}

exports.randomHash = randomHash;