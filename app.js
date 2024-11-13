require('dotenv').config();
const {readFileContent, saveHtmlToFile} = require("./utils/fileUtils");
const {processArticleWithOpenAI} = require("./utils/openaiUtils");

const filePath = './article.txt';
const outputHtmlPath  = './artykul.html';

(async () => {
    try {
        console.log('Rozpoczęto...');
        const articleContent = await readFileContent(filePath);
        const htmlContent = await processArticleWithOpenAI(articleContent);
        await saveHtmlToFile(htmlContent, outputHtmlPath );
    } catch (error) {
        console.error('Błąd podczas generowania artykułu HTML:', error);
    }
})();