/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const getFormSession = require('./behaviours/get-form-session');

module.exports = {
  name: 'feature',
  baseUrl: '/feature',
  steps: {
    "/save-and-return": {
      template: 'save-and-return',
      next: '/start'
    },
    '/start': {
      fields: ['saveEmail'],
      next: '/forms'
    },
    '/forms': {
      behaviours: getFormSession,
      template: 'forms',
      next: '/reference'
    },
    '/reference': {
      fields: ['reference'],
      template: 'save-and-continue-field',
      next: '/name' 
    },
    '/name': {
      fields: ['name'],
      template: 'save-and-continue-field',
      next: '/checkboxes'
    },
    '/checkboxes': {
      fields: ['incomeTypes'],
      template: 'save-and-continue-field',
      next: '/text-area-input'
    },
    '/text-area-input': {
      fields: ['textArea'],
      template: 'save-and-continue-field',
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, 'complete'],
      sections: require('./sections/summary-data-sections'),
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
}