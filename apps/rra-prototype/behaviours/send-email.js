'use strict';

const utils = require('../lib/utils');
const uuid = require('uuid');

module.exports = superclass => class Submit extends superclass {
  saveValues(req, res, next) {
    const reference = uuid.v1();
    const app = 'rra-prototype';
    const component =  req.sessionModel.get('appliedBefore') === 'no' ? ' - 1st App' : ' - Higher Rate';
    const sortSections = false;
    return utils.sendEmail(req.sessionModel.toJSON(), reference, app, component, sortSections)
      .then(() => Submit.handleSuccess(req, next, reference, app, component, sortSections, true))
      .catch(err => Submit.handleError(req, next, reference, app, component, sortSections, err, true));
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
