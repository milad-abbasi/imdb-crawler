const ImdbCrawler = require('./imdbCrawler');

const imdbCrawler = new ImdbCrawler('https://www.imdb.com');

async function start() {
  const res = await imdbCrawler.crawlAndIndex();
  console.log(res.length);
}

start();
