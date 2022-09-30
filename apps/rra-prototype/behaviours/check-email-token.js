'use strict';
const checkToken = require('../models/check-token');
const config = require('../../../config');

/* eslint no-process-env: 0*/
module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const token = req.query.token;
    const email = req.query.email || config.skipEmail;

    const skipEmailAuth = token === 'skip' && config.allowSkip && email;
    const validEmailToken = req.sessionModel.get('valid-token') === true;

    if (skipEmailAuth || validEmailToken) {
      req.sessionModel.set('rraEmail', email);
      return super.saveValues(req, res, next);
    }
    // returns a Promise
    return checkToken.read(token)
      .then(user => {
        if (user.valid) {
        // delete the token once it's been used
          checkToken.delete(token);
          // this is so a user can go back without requesting a new token
          req.sessionModel.set('valid-token', true);
          // store email & org to send to caseworker later
          req.sessionModel.set('rraEmail', user.email);
          return super.saveValues(req, res, next);
        }
        return res.redirect('/rra-prototype/token-invalid');
      })
    // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }
};
