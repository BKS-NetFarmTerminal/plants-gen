require('dotenv').config();

const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');


// Путь к локальному репозиторию
const repoPath = path.join(__dirname, '../../../NFT-collection');
const git = simpleGit(repoPath);

async function setupGit() {
    try {
        // Настраиваем remote URL с токеном
        await git.remote([
            'set-url',
            'origin',
            `${process.env.REPO_URL}`
        ]);

        // Проверяем подключение
        const remotes = await git.getRemotes(true);
        console.log('Current remotes:', remotes);
    } catch (error) {
        console.error('Git setup error:', error);
    }
}

async function commitAndPush(imageBuffer, fileName) {
    try {
        await setupGit();

        const imagePath = path.join(repoPath, fileName);
        fs.writeFileSync(imagePath, imageBuffer);

        await git.add(fileName);
        await git.commit(`Auto-commit: ${Date.now()}`);
        await git.push('origin', 'main');

        console.log('Push successful!');
    } catch (error) {
        console.error('Git error:', error.message);
    }
}
exports.commitAndPush = commitAndPush;
// Пример вызова:
// commitAndPush(Buffer.from('...'), 'nft-image.png');