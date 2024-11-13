const fs = require('fs').promises;

const readFileContent = async (filePath) => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file from ${filePath}:`, error);
        throw error;
    }
};

const saveHtmlToFile = async (htmlContent, filePath) => {
    try {
        await fs.writeFile(filePath, htmlContent);
        console.log(`Plik zapisany jako ${filePath}`);
    } catch (error) {
        console.error(`Błąd podczas zapisywania pliku do ${filePath}:`, error);
        throw error;
    }
};

module.exports = {
    readFileContent,
    saveHtmlToFile,
}