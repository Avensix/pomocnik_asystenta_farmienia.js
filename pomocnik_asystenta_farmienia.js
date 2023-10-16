const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://pl193.plemiona.pl/game.php?village=28111&screen=premium&mode=log';

axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Znajdź odpowiednie selektory na stronie i wyciągnij dane
      const data = [];

      // Przykładowe selektory:
      const dateSelector = $('YOUR_DATE_SELECTOR').text();
      const worldSelector = $('YOUR_WORLD_SELECTOR').text();
      const transactionSelector = $('YOUR_TRANSACTION_SELECTOR').text();
      const changeSelector = $('YOUR_CHANGE_SELECTOR').text();
      const newBalanceSelector = $('YOUR_NEW_BALANCE_SELECTOR').text();
      const detailsSelector = $('YOUR_DETAILS_SELECTOR').text();

      // Dodaj dane do tablicy
      data.push({
        Data: dateSelector,
        Świat: worldSelector,
        Transakcja: transactionSelector,
        Zmiana: changeSelector,
        NoweSaldoPP: newBalanceSelector,
        DalszeInformacje: detailsSelector,
      });

      // Możesz przetwarzać dane, filtrować, sumować itp.

      console.log(data);
    }
  })
  .catch((error) => {
    console.error('Wystąpił błąd podczas pobierania strony:', error);
  });
