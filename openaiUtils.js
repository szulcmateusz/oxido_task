const {OpenAI} = require('openai');
const client = new OpenAI();

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

        return response.choices[0].message.content.replace('```html', '',).replace('```', '');
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        throw error;
    }
};

module.exports = {
    processArticleWithOpenAI,
};