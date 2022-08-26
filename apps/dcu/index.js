/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const VerifyEmail = require('./behaviours/verify-email');
const SendEmail = require('./behaviours/send-email');

module.exports = {
  name: 'dcu',
  baseUrl: '/dcu',
  steps: {
    '/landing-page': {
      template: 'dcu',
      next: '/ukvi'
    },
    '/ukvi': {
      template: 'ukvi',
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/address'
    },
    '/address': {
      fields: ['building', 'street', 'townOrCity', 'postcode'],
      next: '/email'
    },
    '/email': {
      behaviours: [VerifyEmail],
      fields: ['email', 'emailVerify'],
      next: '/email-subject'
    },
    '/email-subject': {
      fields: ['emailSubject', 'description'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, 'complete', SendEmail],
      sections: require('./sections/summary-data-sections'),
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
  }
};
