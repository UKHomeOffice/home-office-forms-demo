'use strict';

const utils = require('../lib/utils');
const uuid = require('uuid');

module.exports = superclass => class Submit extends superclass {
  saveValues(req, res, next) {
    const reference = uuid.v1();
    return utils.sendEmail(req.sessionModel.toJSON(), reference)
      .then(() => Submit.handleSuccess(req, next, reference, true))
      .catch(err => Submit.handleError(req, next, reference, err, true));
  }
  static handleSuccess(req, next, reference, shouldLog) {
    if (shouldLog) {
      req.log('info', 'Email sent to RRA address', `reference=${reference}`);
    }
    return next();
  }

  static handleError(req, next, reference, err, shouldLog) {
    if (shouldLog) {
      req.log('error', 'Error sending email to RRA address', `reference=${reference}`, err);
    }
    err.formNotSubmitted = true;
    return next(err);
  }
};
