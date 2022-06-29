/* eslint-disable */
'use strict';
const checkEmailToken = require('./behaviours/check-email-token');
const CountrySelect = require('./behaviours/country-select')
const SummaryPageBehaviour = require('hof').components.summary;
const InternationalPhoneNumber = require('./behaviours/international-number');
const EmailBehaviour = require('./behaviours/send-email');
const SkillBehaviour = require('./behaviours/skills');
const Skill2Behaviour = require('./behaviours/skills2');
const resumeSession = require('./behaviours/resume-form-session');

module.exports = {
  name: 'demo',
  pages: {
    '/demo/token-invalid': 'token-invalid'
  },
  steps: {
    '/': {
      template: 'start',
    },
    '/build-your-own-form': {
      template: 'form-guidance-link'
    },
    '/begin':{
      behaviours: [
        checkEmailToken
      ],
      next: '/applied-before',
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
          field: 'form-type',
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
      behaviours: [SummaryPageBehaviour, EmailBehaviour, 'complete'],
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
    '/rra-prototype': {
      template: 'rra-prototype',
      next: '/verify/who-do-you-work-for',
    },
    '/rraLogin': {
      template: 'rra-login',
      fields: ['rraEmail', 'rraPassword'],
      next: '/applied-before',
    },
    '/applied-before': {
      fields: ['appliedBefore'],
      behaviours: [resumeSession],
      next: '/personalDetails',
    },
    '/personalDetails': {
      fields: ['rraName', 'rraAdelphiNumber','rraFunction', 'rraEmail'],
      next: '/professionDetails'
    },
    '/professionDetails': {
      fields: ['rraRole', 'rraGrouping', 'rraGrade', 'rraLevels'],
      next: '/skill1',
    },
    '/skill1': {
      behaviours: [SkillBehaviour],
      fields: ['rraSkill', 'rraScores', 'rraEvidence', 'rraSupportingDocuments'],
      next: '/skill2'
    },
    '/skill2': {
      behaviours: [Skill2Behaviour],
      fields: ['rraSkill2', 'rraScores2', 'rraEvidence2', 'rraSupportingDocuments2'],
      next: '/confirm'
    }
  }
};
