'use strict';
const emailSubjectOptions = require('../fields.js').emailSubject.options;
const utils = require('../lib/utils');
const uuid = require('uuid');
const _ = require('lodash');


module.exports = superclass => class Submit extends superclass {
  saveValues(req, res, next) {
    const reference = uuid.v1();
    const emailSubjectValue = req.form.historicalValues.emailSubject;
    const emailSubject = _.get( _.find(emailSubjectOptions, e => e.value === emailSubjectValue), 'label', '');


    return utils.sendEmail(req.sessionModel.toJSON(), reference, emailSubject)
      .then(() => Submit.handleSuccess(req, next, reference, true))
      .catch(err => Submit.handleError(req, next, reference, err, true));
  }
  static handleSuccess(req, next, reference, shouldLog) {
    if (shouldLog) {
      req.log('info', 'Email sent to DCU address', `reference=${reference}`);
    }
    return next();
  }

  static handleError(req, next, reference, err, shouldLog) {
    if (shouldLog) {
      req.log('error', 'Error sending email to DCU address', `reference=${reference}`, err);
    }
    err.formNotSubmitted = true;
    return next(err);
  }
};
