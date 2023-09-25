/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const VerifyEmail = require('./behaviours/verify-email');
const SendEmail = require('./behaviours/send-email');
const getSearchResults = require('./behaviours/get-search');

module.exports = {
  name: 'dcu',
  steps: {
    '/': {
      template: 'ukvi',
      next: '/policy'
    },
    '/policy': {
      template: 'dcu',
      next: '/api-search'
    },
    '/api-search': {
      fields: ['api-search'],
      next: '/search-results'
    },
     '/search-results': {
      template: 'search-results',
      fields: ['still-contact'],
      behaviours: [getSearchResults],
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
