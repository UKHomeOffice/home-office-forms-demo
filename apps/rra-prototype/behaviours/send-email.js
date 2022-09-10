'use strict';

const SendEmail = require('../lib/utils');
const uuid = require('uuid');

module.exports = superclass => class Submit extends superclass {
  async successHandler(req, res, next) {
    try {
      const utils = new SendEmail({
        reference: uuid.v1(),
        app: 'rra-prototype',
        component: req.sessionModel.get('appliedBefore') === 'no' ? ' - 1st App' : ' - Higher Rate',
        sendReceipt: true,
        sortSections: false,
      });

      await utils.sendEmail(req, res, super.locals(req, res));

      req.log('info', 'rra.form.submit_form.successful');
      return super.successHandler(req, res, next);
    } catch (err) {
      req.log('error', 'rra.form.submit_form.error', err.message || err);
      return next(err);
    }
  }
};
