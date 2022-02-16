/* eslint-disable */
'use strict';

const CountrySelect = require('./behaviours/country-select')
const SummaryPageBehaviour = require('hof').components.summary;
const getFormSession = require('./behaviours/get-form-session')
const InternationalPhoneNumber = require('./behaviours/international-number');
const SaveFormSession = require('./behaviours/save-form-session');

module.exports = {
  name: 'demo',
  steps: {
    '/landing-page': {
      fields: [
        'landing-page-radio'
      ],
      next: '/name',
      forks: [
        {
          target: '/build-your-own-form',
          condition: {
            field: 'landing-page-radio',
            value: 'build-your-own-form'
          }
        },
        {
          target: '/continue-saved-form',
          condition: {
            field: 'landing-page-radio',
            value: 'complex-form'
          }
        }
      ],
    },
    '/build-your-own-form': {
      template: 'form-guidance-link'
    },
    '/continue-saved-form': {
      template: 'continue-saved-form',
      fields: [
        'continueSavedForms', 
        'savedFormEmail'
      ],
      next: '/forms',
      forks: [{
        target: '/name',
        condition: {
          field: 'continueSavedForms',
          value: 'no'
        }
      }]
    },
    '/forms':{
      behaviours: getFormSession,
      template: 'forms',
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/dob'
    },
    '/dob': {
      fields: ['dateOfBirth'],
      next: '/address'
    },
    '/address': {
      fields: ['building', 'street', 'townOrCity', 'postcode'],
      next: '/checkboxes'
    },
    '/checkboxes': {
      fields: ['incomeTypes'],
      next: '/radio'
    },
    '/radio':{
      fields: ['countryOfHearing'],
      forks: [{
        target: '/country',
        condition: {
          field: 'landing-page-radio',
          value: 'complex-form'
        }
      }],
      next: '/email'
    },
    '/email': {
      fields: ['email'],
      next: '/phone-number'
    },
    '/phone-number': {
      fields: ['phone'],
      next: '/confirm'
    },
    '/country': {
      behaviours: CountrySelect,
      fields: ['countrySelect'],
      next: '/text-input-area'
    },
    '/text-input-area': {
      fields: ['complaintDetails'],
      next: '/checkbox-not-both-options'
    },
    '/checkbox-not-both-options':{
      template: 'weapons',
      fields: ['weaponsTypes'],
      next: '/select'
    },
    '/select':{
      fields: ['appealStages'],
      next: '/save-form'
    },
    '/save-form': {
      behaviours: SaveFormSession,
      fields: ['saveForm', 'saveEmail', 'saveRef'],
      forks: [{
        target: '/save-confirmation',
        condition: {
          field: ['saveForm'],
          value: 'yes'
        }
      }
      ],
      next: '/confirm'
    },
    '/save-confirmation': {
      backLink: false
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, 'complete'],
      sections: require('./sections/summary-data-sections'),
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
    '/international-phone-number': {
      behaviours: InternationalPhoneNumber,
      fields: [
        'int-phone-number'
      ],
      next: '/confirm'
    },
  }
};
