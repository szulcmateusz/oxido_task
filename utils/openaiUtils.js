const {OpenAI} = require('openai');
const client = new OpenAI();

const processArticleWithOpenAI = async (articleContent) => {
    const prompt = `
    Wygeneruj profesjonalny kod HTML, zgodny ze standardami, na podstawie poniższego tekstu artykułu. Kod HTML powinien spełniać następujące wymagania:
- Użyj odpowiednich tagów HTML, takich jak <h1>, <p>, i <img>, aby nadać strukturę.
- Wstaw grafikę tam, gdzie byłaby odpowiednia, używając tagu <img src="image_placeholder.jpg" alt="pełny, dokładny prompt do wygenerowania grafiki">.
- Upewnij się, że każdy atrybut \`alt\` zawiera kompletny opis lub prompt do wygenerowania obrazu.
- Każdy obraz powinien być zawarty w tagu <figure>, z podpisem umieszczonym poniżej w tagu <figcaption>, np.:
  <figure>
    <img src="image_placeholder.jpg" alt="pełny, dokładny prompt do wygenerowania grafiki">
    <figcaption>Opis grafiki</figcaption>
  </figure>
- Pomijaj tagi <html>, <head> i <body>.
- Użyj kodowania UTF-8, aby poprawnie obsługiwać polskie znaki i napraw wszelkie problemy z kodowaniem, jeśli to konieczne.
  `;

    try {
        console.log('Trwa generowanie HTML...');
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {role: "system", content: "Jesteś asystentem, który generuje profesjonalny, dobrze sformatowany HTML. Każda grafika powinna mieć alt opisujący prompt do jej wygenerowania, a wszystkie treści powinny być poprawnie zakodowane w standardzie UTF-8, bez błędów kodowania polskich znaków.\n"},
                {role: "user", content: `${prompt}\n\n${articleContent}`}
            ],
            temperature: 0.4,
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