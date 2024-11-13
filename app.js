require('dotenv').config();
const fs = require('fs').promises;

const apiKey = process.env.OPENAI_API_KEY;
const filePath = './artykul_tekst.txt';

const readFileContent = async() => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file from ${filePath}:`, error);
        throw error;
    }
};

(async() => {
    console.log(await readFileContent());
})();