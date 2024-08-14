/* eslint-disable */
'use strict';

const CountrySelect = require('./behaviours/country-select')
const SummaryPageBehaviour = require('hof').components.summary;
const InternationalPhoneNumber = require('./behaviours/international-number');
const LogIPAddress = require('./behaviours/log-ipaddress');

module.exports = {
  name: 'demo',
  steps: {
    '/start': {
      template: 'start',
      next: '/choose'
    },
    '/choose': {
      fields: ['chooseAForm'],
      forks: [
        {
          target: '/name',
          condition: {
            field: 'chooseAForm',
            value: 'basic'
          }
        },
        {
          target: '/name',
          condition: {
            field: 'chooseAForm',
            value: 'complex'
          }
        },
        {
          target: '/build-your-own-form',
          condition: {
            field: 'chooseAForm',
            value: 'build-your-own-form'
          }
        }
      ]
    },
    '/build-your-own-form': {
      template: 'form-guidance-link'
    },
    '/name': {
      behaviours: LogIPAddress,
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
          field: 'chooseAForm',
          value: 'complex'
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
      next: '/confirm'
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
