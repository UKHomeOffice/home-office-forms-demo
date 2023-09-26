const axios = require('axios');
const config = require('../../../config');
const _ = require('lodash');

module.exports = superclass => class extends superclass {

  getValues(req, res, next) {
    return this.getSearchResults(req, res, next);
  }
  async getSearchResults(req, res, next) {
    let searchResults = [];

    try {
      const query = req.sessionModel.get('api-search');
      const response = await axios.get('https://www.gov.uk/api/search.json?q=' + query);

      searchResults = response.data.results.map(r => {
        return { title: r.title, link: r.link }
      });
      req.sessionModel.set('results', searchResults.slice(0,3));
    } catch (e) {
      return next(e);
    }
    return super.getValues(req, res, next);
  }
};
