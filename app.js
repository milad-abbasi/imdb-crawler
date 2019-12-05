const ImdbCrawler = require('./imdbCrawler');
// 0 results found in 0ms
const imdbCrawler = new ImdbCrawler([
  'https://www.imdb.com/movies-in-theaters'
]);

async function start() {
  const res = await imdbCrawler.crawl();

  console.log(res.length);
}

start();
