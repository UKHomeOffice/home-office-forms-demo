/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'dcu',
  baseUrl: '/dcu',
  steps: {
    '/landing-page': {
      template: 'dcu',
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: ['/address']
    },
    '/address': {
      fields: ['building', 'street', 'townOrCity', 'postcode'],
      next: '/email'
    },
    '/email': {
      fields: ['email', 'email-verify'],
      next: '/email-subject'
    },
    '/email-subject': {
      fields: ['emailSubject', 'description'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, 'complete'],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
  }
};
