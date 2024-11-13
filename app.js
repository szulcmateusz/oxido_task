require('dotenv').config();
const {readFileContent, saveHtmlToFile, updatePreviewTemplate} = require("./utils/fileUtils");
const {processArticleWithOpenAI} = require("./utils/openaiUtils");

const filePath = './article.txt';
const outputHtmlPath  = './artykul.html';
const previewTemplatePath = './templates/szablon.html';
const previewOutputPath = './templates/podglad.html';

(async () => {
    try {
        console.log('Rozpoczęto...');
        const articleContent = await readFileContent(filePath);
        const htmlContent = await processArticleWithOpenAI(articleContent);
        await saveHtmlToFile(htmlContent, outputHtmlPath );
        await updatePreviewTemplate(previewTemplatePath, htmlContent, previewOutputPath);

    } catch (error) {
        console.error('Błąd podczas generowania artykułu HTML:', error);
    }
})();