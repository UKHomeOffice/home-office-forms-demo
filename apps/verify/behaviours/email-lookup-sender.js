'use strict';
const emailDomainCheck = require('../../../rra-lists/email_domains');
const config = require('../../../config');
const notifyApiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const templateId = config.email.templateUserAuthId;
const appPath = require('../../rra-prototype/index').baseUrl;
const firstStep = '/start';
const tokenGenerator = require('../models/save-token');

const getPersonalisation = (host, token) => {
  return {
    // pass in `&` at the end in case there is another
    // query e.g. ?hof-cookie-check
    'subject': 'RRA User Log On',
    'link': `http://${host + appPath + firstStep}?token=${token}&`,
    'time_limit': '30',
    'host': `http://${host}`,
  };
};

const sendEmail = (email, host, token) => {
  notifyClient
    .sendEmail(templateId, email, {
      personalisation: getPersonalisation(host, token)
    })
    // we will need to log out the response to a proper logger
    // eslint-disable-next-line no-console
    .then(console.log(`email sent to ${email}`))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

module.exports = superclass => class extends superclass {

  skipEmailVerification(email) {
    return config.allowSkip && email === config.skipEmail;
  }

  saveValues(req, res, next) {
    const email = req.form.values['rraEmail'];

    if (this.skipEmailVerification(email)) {
      return super.saveValues(req, res, next);
    }

    return super.saveValues(req, res, err => {
      const emailDomain = email.replace(/.*@/, '');

      const isRecognisedEmail = emailDomainCheck.isValidDomain(emailDomain);

      if (!isRecognisedEmail) {
        req.sessionModel.set('recognised-email', false);
        return next(err);
      }

      const host = req.get('host');
      const token = tokenGenerator.save(email);
      sendEmail(email, host, token);
      return next(err);
    });
  }

  // fork to error page when an email domain is not recognised
  getNextStep(req, res) {
    if (req.sessionModel.get('recognised-email') === false) {
      req.sessionModel.unset('recognised-email');
      return 'email-not-recognised';
    }

    const email = req.form.values['rraEmail'];

    if (this.skipEmailVerification(email)) {
      return res.redirect('/rra-prototype/start?token=skip');
    }

    return super.getNextStep(req, res);
  }
};
