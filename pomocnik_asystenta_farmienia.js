const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://pl193.plemiona.pl/game.php?village=28111&screen=premium&mode=log';

axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Znajdź tabelę, która zawiera dane o wydanych punktach premium
      const table = $('table#transaction_table');

      // Zdefiniuj zmienne do przechowywania sumy wydanych punktów
      let spentPoints = 0;

      // Iteruj przez wiersze tabeli
      table.find('tr').each((index, row) => {
        // Pomijamy pierwszy wiersz z nagłówkami
        if (index > 0) {
          // Pobierz komórkę w kolumnie "Koszt"
          const costCell = $(row).find('td:nth-child(5)');
          const cost = parseInt(costCell.text(), 10);

          // Dodaj koszt do sumy wydanych punktów
          if (!isNaN(cost)) {
            spentPoints += cost;
          }
        }
      });

      console.log('Suma wydanych punktów premium: ' + spentPoints);
    }
  })
  .catch((error) => {
    console.error('Wystąpił błąd podczas pobierania strony:', error);
  });
