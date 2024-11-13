
# Generowanie Podglądu Artykułów z AI

## Opis projektu

Projekt jest aplikacją Node.js, która korzysta z API OpenAI do generowania zawartości artykułów w formacie HTML. Treść artykułów jest dynamicznie aktualizowana w pliku `podglad.html`, umożliwiając wygodne przeglądanie najnowszego artykułu. Projekt jest modularnie zorganizowany, a każda funkcjonalność została oddzielona do osobnych plików.

## Funkcjonalności

- **Generowanie artykułów HTML**: Aplikacja pobiera tekst artykułu, generuje jego strukturę HTML za pomocą OpenAI, i zapisuje wynik w `artykul.html`.
- **Dynamiczny podgląd artykułu**: Każdy wygenerowany artykuł jest umieszczany w `podglad.html` z wykorzystaniem stylizowanego szablonu HTML (`szablon.html`).
- **Poprawa błędnego kodowania tekstu**: Aplikacja sprawdza i poprawia kodowanie polskich znaków, jeśli wykryje problem z kodowaniem (np. wynikającym z niepoprawnie zakodowanych znaków diakrytycznych).
- **Bezpieczne przechowywanie klucza API**: Zainstalowano paczkę `dotenv`, aby przechowywać klucz API OpenAI w pliku `.env` i uniknąć jego commitowania.

## Uwagi dotyczące templatki

Początkowym zamysłem było stworzenie typowo blogowego szablonu z pełnym układem strony (menu, nagłówkiem, stopką itd.). Jednak zgodnie z poleceniem, treść miała zostać umieszczona tylko w tagach `<body>` (bez dodatkowych elementów HTML), co doprowadziło do wyboru minimalistycznej templatki.

## Wymagania

- Node.js
- Konto OpenAI i klucz API

## Instalacja

1. **Klonowanie repozytorium**

   ```bash
   git clone https://github.com/szulcmateusz/oxido_task
   cd oxido_task
   ```

2. **Instalacja zależności**

   ```bash
   npm install
   ```

3. **Konfiguracja API**

   Utwórz plik `.env` w katalogu głównym projektu i dodaj swój klucz API OpenAI:

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Przygotowanie pliku artykułu**

   Umieść plik tekstowy zawierający treść artykułu w `article.txt` (możesz skorzystać z przykładowego pliku w repozytorium).

## Uruchomienie programu

Aby uruchomić aplikację i wygenerować podgląd artykułu, wykonaj poniższą komendę:

```bash
node app.js
```

Aplikacja wykona następujące kroki:

1. Odczyta treść artykułu z `article.txt`.
2. Przetworzy treść artykułu za pomocą OpenAI, tworząc strukturę HTML.
3. Zapisze wynik w pliku `artykul.html`.
4. Zaktualizuje `podglad.html`, wstawiając nowy artykuł do przygotowanego szablonu.



## Uwagi

- Upewnij się, że plik `.env` jest poprawnie skonfigurowany z kluczem API.
- `podglad.html` będzie aktualizowany za każdym razem, gdy aplikacja zostanie uruchomiona z nową treścią artykułu.

