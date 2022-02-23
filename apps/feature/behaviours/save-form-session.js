/* eslint-disable consistent-return, no-else-return */
'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/forms/';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      const session = req.sessionModel.toJSON();
      delete session['csrf-secret'];
      delete session.errors;
      axios.post(baseUrl, {
        email: req.sessionModel.get('saveEmail'),
        id: req.sessionModel.get('id'),
        session: session
      })
        .catch(function (error) {
          if (error) {
            next(error);
          }
        })
        .then(function (response) {
          const resData = response.data;
          if (resData && resData.length && resData[0].id) {
            req.sessionModel.set('id', resData[0].id);
          } else {
            req.sessionModel.unset('id');
          }
          if (req.body['save-and-exit']) {
            return res.redirect('/feature/save-and-exit');
          } else {
            next();
          }
        });
    });
  }
};
