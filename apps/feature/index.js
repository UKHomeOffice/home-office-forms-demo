/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const getFormSession = require('./behaviours/get-form-session');
const SaveFormSession = require('./behaviours/save-form-session');

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
    '/continue-form':{
      template: 'continue-form'
    },
    '/reference': {
      behaviours: SaveFormSession,
      fields: ['reference'],
      template: 'save-and-continue-field',
      next: '/name' 
    },
    '/name': {
      behaviours: SaveFormSession,
      fields: ['name'],
      template: 'save-and-continue-field',
      next: '/checkboxes'
    },
    '/checkboxes': {
      behaviours: SaveFormSession,
      fields: ['incomeTypes'],
      template: 'save-and-continue-field',
      next: '/text-area-input'
    },
    '/text-area-input': {
      behaviours: SaveFormSession,
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