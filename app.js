require('dotenv').config();
const fs = require('fs').promises;
const {OpenAI} = require('openai');

const filePath = './article.txt';
const client = new OpenAI();

const readFileContent = async () => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file from ${filePath}:`, error);
        throw error;
    }
};

const processArticleWithOpenAI = async (articleContent) => {
    const prompt = `
    Wygeneruj treść HTML na podstawie poniższego tekstu artykułu, spełniając następujące wymagania:
    - Użyj odpowiednich tagów HTML, takich jak <h1>, <p>, <img>, aby nadać strukturę.
    - Wstaw grafikę wszędzie tam, gdzie byłaby odpowiednia, używając tagu <img src="image_placeholder.jpg" alt="dokładny prompt do wygenerowania grafiki">.
    - Upewnij się, że atrybut alt zawiera pełny, dokładny prompt, który można wykorzystać do wygenerowania grafiki.
    - Każdy obraz powinien być zawarty w tagu <figure>, a poniżej umieść podpis pod grafiką w tagu <figcaption>, np.:
      <figure>
        <img src="image_placeholder.jpg" alt="dokładny prompt do wygenerowania grafiki">
        <figcaption>Opis grafiki</figcaption>
      </figure>
    - Pomijaj tagi <html>, <head> i <body>.
    - Upewnij się, że polskie znaki są poprawnie zakodowane, i popraw wszelkie błędy związane z kodowaniem, jeśli to konieczne.
  `;

    try {
        console.log('Trwa generowanie HTML...');
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {role: "system", content: "Jesteś asystentem, który generuje treść HTML.\n"},
                {role: "user", content: `${prompt}\n\n${articleContent}`}
            ],
            temperature: 0.7,
        });

        console.log(response.choices[0].message.content);

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        throw error;
    }
};

(async () => {
    try {
        console.log('Rozpoczęto...');
        const articleContent = await readFileContent('article.txt');
        const htmlContent = await processArticleWithOpenAI(articleContent);
    } catch (error) {
        console.error('Błąd podczas generowania artykułu HTML:', error);
    }
})();