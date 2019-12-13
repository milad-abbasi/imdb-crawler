const ImdbCrawler = require('./imdbCrawler');

const imdbCrawler = new ImdbCrawler([
  'https://www.imdb.com/movies-in-theaters',
  'https://www.imdb.com/movies-coming-soon',
  'https://www.imdb.com/chart/top'
]);

async function start() {
  const res = await imdbCrawler.crawlAndIndex();
  console.log(res.length);
}

start();
