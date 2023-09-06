/* eslint-disable */
'use strict';

const summary = require('hof').components.summary;

module.exports = {
  name: 'demo',
  baseurl: '/',
  steps: {
    // '/': {
    //   template: 'start'
    // },
    // '/build-your-own-form': {
    //   template: 'form-guidance-link'
    // },
    // '/name': {
    //   fields: ['name'],
    //   next: '/dob'
    // },
    // '/dob': {
    //   fields: ['dateOfBirth'],
    //   next: '/address'
    // },
    // '/address': {
    //   fields: ['building', 'street', 'townOrCity', 'postcode'],
    //   next: '/checkboxes'
    // },
    // '/checkboxes': {
    //   fields: ['incomeTypes'],
    //   next: '/radio'
    // },
    // '/radio':{
    //   fields: ['countryOfHearing'],
    //   forks: [{
    //     target: '/country',
    //     condition: {
    //       field: 'form-type',
    //       value: 'complex'
    //     }
    //   }],
    //   next: '/email'
    // },
    // '/email': {
    //   fields: ['email'],
    //   next: '/phone-number'
    // },
    // '/phone-number': {
    //   fields: ['phone'],
    //   next: '/confirm'
    // },
    // '/country': {
    //   behaviours: CountrySelect,
    //   fields: ['countrySelect'],
    //   next: '/text-input-area'
    // },
    // '/text-input-area': {
    //   fields: ['complaintDetails'],
    //   next: '/checkbox-not-both-options'
    // },
    // '/checkbox-not-both-options':{
    //   template: 'weapons',
    //   fields: ['weaponsTypes'],
    //   next: '/select'
    // },
    // '/select':{
    //   fields: ['appealStages'],
    //   next: '/confirm'
    // },
    // '/confirm': {
    //   behaviours: [SummaryPageBehaviour, 'complete'],
    //   sections: require('./sections/summary-data-sections'),
    //   next: '/confirmation'
    // },
    // '/confirmation': {
    //   backLink: false
    // },
    // '/international-phone-number': {
    //   behaviours: InternationalPhoneNumber,
    //   fields: [
    //     'int-phone-number'
    //   ],
    //   next: '/confirm'
    // },
    '/application-submitted': {
      fields: ['application-submitted'],
      forks: [{
        target: '/question-about-submitted',
        condition: {
          field: 'application-submitted',
          value: 'Yes'
        }
      }]
    },
    // Needs conditional logic for this step to decide which screen to go next dependent on user selection
    '/question-about-submitted': {
      fields: ['whatIsYourQuestionAbout'],
      next: '/how-applied'
    },
    '/how-applied': {
      fields: ['applicationMethod'],
      next: '/details-submitted'
    },
    '/details-submitted': {
      fields: ['yourQuestion', 'email', 'name', 'etaReferenceNumber'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [summary],
      next: '/confirmation'
    },
    '/confirmation': {
        backLink: false
      }
  }
};
