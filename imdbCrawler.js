const cheerio = require('cheerio');

const axios = require('./axios');

class IMDBCrawler {
  constructor(seedUrls) {
    this.seedUrls = seedUrls;
  }

  async extractMoviesLinks(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const moviesLinks = [];

    $('#main a[title]').each((i, element) => {
      const link = $(element).attr('href');
      const title = $(element).attr('title');
      const linkParts = link.split('/', 3);

      if (linkParts[1] === 'title' && title !== 'Delete') {
        const movieId = linkParts[2];

        moviesLinks.push(movieId);
      }
    });

    return moviesLinks;
  }

  async extractMovieDetails(movieId) {
    const { data } = await axios.get(`/title/${movieId}`);
    const $ = cheerio.load(data);
    const content = $('#content-2-wide');
    const details = {};

    const titleAndYear = content.find('#titleYear').parent();
    details.year = titleAndYear.find('a').text();
    titleAndYear.find('#titleYear').remove();
    details.name = titleAndYear.text().trim();
    details.rating = content.find('div.ratingValue strong span').text();

    const summary = content.find('div.plot_summary');
    details.summary = summary
      .find('.summary_text')
      .text()
      .trim();
    details.director = summary
      .children()
      .eq(1)
      .find('a')
      .first()
      .text();
    details.writer = summary
      .children()
      .eq(2)
      .find('a')
      .first()
      .text();

    details.stars = [];
    const stars = summary
      .children()
      .eq(3)
      .find('a');
    stars.each((i, element) => {
      if (i !== stars.length - 1) details.stars.push($(element).text());
    });

    details.metascore = content.find('.metacriticScore span').text();
    details.storyLine = content
      .find('#titleStoryLine p')
      .text()
      .trim();

    details.genres = [];
    const genres = content
      .find('#titleStoryLine div:contains("Genres")')
      .find('a');
    genres.each((i, element) => {
      details.genres.push(
        $(element)
          .text()
          .trim()
      );
    });

    return details;
  }

  async crawl() {
    const movieIDs = [];
    const movieDetails = [];

    let seedUrl;
    while (this.seedUrls.length) {
      try {
        seedUrl = this.seedUrls.shift();
        console.log(`Extracting links from: ${seedUrl}`);
        const links = await this.extractMoviesLinks(seedUrl);

        movieIDs.push(...links);
      } catch (err) {
        console.error(err.message);
        this.seedUrls.push(seedUrl);
      }
    }

    console.log(`Found ${movieIDs.length} links...`);

    let movieLink;
    while (movieIDs.length) {
      try {
        movieLink = movieIDs.shift();
        console.log(`Requesting ${movieLink}...`);
        const details = await this.extractMovieDetails(movieLink);

        console.log('Got: ', details);
        movieDetails.push(details);
      } catch (err) {
        console.error(err.message);
        movieIDs.push(movieLink);
      }
    }

    return movieDetails;
  }
}

module.exports = IMDBCrawler;
