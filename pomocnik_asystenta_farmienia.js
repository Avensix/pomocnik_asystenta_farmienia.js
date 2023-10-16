// Importujemy wymagane biblioteki
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://pl193.plemiona.pl/game.php?village=28111&screen=premium&mode=log';

function getDataUsingSelectors(selectors) {
  axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const data = [];

        for (const selector of selectors) {
          const value = $(selector).text();
          data.push({
            Selector: selector,
            Value: value,
          });
        }

        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Wystąpił błąd podczas pobierania strony:', error);
    });
}

function showDialogAndGetSelectors() {
  const dialog = Dialog.show('Script', `
    <div>
      <p>Podaj selektory, które chcesz użyć do analizy strony.</p>
      <textarea id="selectors" placeholder="Wprowadź selektory oddzielone przecinkami" style="width: 100%; height: 100px;"></textarea>
      <button onclick="getDataUsingSelectors()">Pobierz dane</button>
    </div>
  `);
}

showDialogAndGetSelectors();
