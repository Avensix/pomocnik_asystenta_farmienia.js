// Importujemy wymagane biblioteki
const axios = require('axios');
const cheerio = require('cheerio');

// Adres URL strony, którą chcemy analizować
const url = 'https://pl193.plemiona.pl/game.php?village=28111&screen=premium&mode=log';

// Pobieramy zawartość strony
axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Inicjalizujemy pustą tablicę na grupy
      const groups = [];

      // Znajdujemy wszystkie elementy "td" z identyfikatorem "content_value"
      $('td#content_value').each((index, element) => {
        // Tworzymy obiekt dla każdej grupy i wypełniamy go odpowiednimi danymi
        const group = {
          Data: $(element).text(),  // Tutaj dodajemy odpowiedni selektor, aby znaleźć datę
          Świat: '',  // Tutaj dodajemy odpowiedni selektor, aby znaleźć świat
          Transakcja: '',  // Tutaj dodajemy odpowiedni selektor, aby znaleźć transakcję
          Zmiana: '',  // Tutaj dodajemy odpowiedni selektor, aby znaleźć zmianę
          NoweSaldoPP: '',  // Tutaj dodajemy odpowiedni selektor, aby znaleźć nowe saldo PP
          DalszeInformacje: '',  // Tutaj dodajemy odpowiedni selektor, aby znaleźć dalsze informacje
        };

        // Dodajemy grupę do tablicy
        groups.push(group);
      });

      // Możesz tutaj dodać kod do filtrowania i sumowania danych w grupach

      // Wyświetlamy wyniki
      console.log(groups);
    }
  })
  .catch((error) => {
    console.error('Wystąpił błąd podczas pobierania strony:', error);
  });
