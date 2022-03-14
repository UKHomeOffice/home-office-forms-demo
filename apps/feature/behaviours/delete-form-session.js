'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/forms/';
const encodeEmail = require('../lib/encode-email');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      if (req.sessionModel.get('id') && req.sessionModel.get('saveEmail')) {
        const id = req.sessionModel.get('id');
        axios.delete(baseUrl + encodeEmail(req.sessionModel.get('saveEmail')) + '/' + id)
          .then(function () {
            next();
          });
      }
    });
  }
};
