'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/forms/';
const encodeEmail = require('../util/encode-email');

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    return req.query.id && req.query.reference ?
      super.getValues(req, res, next) :
      res.redirect('/feature/forms');
  }

  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      id: req.query.id,
      reference: req.query.reference
    });
  }

  saveValues(req, res, next) {
    const id = req.body.confirm;

    if (id) {
      const email = encodeEmail(req.sessionModel.get('saveEmail'));

      return axios.delete(baseUrl + email + '/' + id)
        .catch(function (error) {
          if (error) {
            next(error);
          }
        })
        .then(function () {
          next();
        });
    }
    return super.saveValues(req, res, next);
  }
};
