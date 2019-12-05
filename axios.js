const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://www.imdb.com',
  timeout: 5000,
  headers: { 'Accept-Language': 'en-US,en;q=0.5' }
});
