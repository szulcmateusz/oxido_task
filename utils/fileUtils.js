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

const updatePreviewTemplate = async (templatePath, newContent, outputPath) => {
    try {
        let template = await readFileContent(templatePath);

        const updatedContent = template.replace(
            /<body>([\s\S]*?)<\/body>/,
            `<body>\n${newContent}\n</body>`
        );

        await saveHtmlToFile(updatedContent, outputPath);
        console.log(`Podgląd artykułu został zaktualizowany w pliku ${outputPath}`);
    } catch (error) {
        console.error('Błąd podczas aktualizacji podglądu:', error);
    }
};

module.exports = {
    readFileContent,
    saveHtmlToFile,
    updatePreviewTemplate,
};