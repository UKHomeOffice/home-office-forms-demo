/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const EmailBehaviour = require('./behaviours/send-email');
const SkillBehaviour = require('./behaviours/skills');
const Skill2Behaviour = require('./behaviours/skills2');
const saveImage = require('./behaviours/save-image');
const removeImage = require('./behaviours/remove-image');
const unsetValue = require('./behaviours/unset-value');
const checkDeviceType = require('./behaviours/check-device-type');
const skipStep = require('./behaviours/skip-step');
const checkAnswers = require('./behaviours/check-answers');

module.exports = {
  name: 'rra-prototype',
  // baseUrl: '/rra-prototype',
  steps: {
    '/rra-prototype': {
      template: 'rra-prototype',
      next: '/rraLogin',
    },
    '/rraLogin': {
      template: 'rra-login',
      fields: ['rraEmail', 'rraPassword'],
      next: '/applied-before',
    },
    '/applied-before': {
      fields: ['appliedBefore'],
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
      fields: ['rraSkill', 'rraScores', 'rraEvidence'],
      next: '/skill2'
    },

    '/skill2': {
      behaviours: [Skill2Behaviour],
      fields: ['rraSkill2', 'rraScores2', 'rraEvidence2', 'rraSupportingDocuments2'],
      next: '/rraSupportingDocumentsUpload'
    },

    '/rraSupportingDocumentsUpload': {
      fields: [
        'rraSupportingDocuments',
        'rraSupportingDocumentsUpload',
      ],
      forks: [
        {
          target: '/rraSupportingDocumentsUploadConfirm',
          condition: {
            field: 'rraSupportingDocumentsUpload',
            value: 'yes'
          }
        },
        {
          target: '/confirm',
          condition: {
            field: 'rraSupportingDocumentsUpload',
            value: 'no'
          }
        }
      ],
      behaviours: [skipStep, saveImage('rraSupportingDocuments'), checkDeviceType],
      continueOnEdit: true
    },

    '/rraSupportingDocumentsUploadConfirm': {
      fields: [
        'rraSupportingDocumentsUploadMore',
        'anotherRraSupportingDocuments'
      ],
      forks: [
        {
          target: '/rraSupportingDocumentsUploadConfirm',
          condition: {
            field: 'rraSupportingDocumentsUploadMore',
            value: 'yes'
          }
        },
        {
          target: '/confirm',
          condition: {
            field: 'rraSupportingDocumentsUploadMore',
            value: 'no'
          }
        }
      ],
      behaviours: [saveImage('anotherRraSupportingDocuments'), removeImage, unsetValue('rraSupportingDocumentsUploadMore')]
    },
    '/confirm': {
      behaviours: [checkAnswers, SummaryPageBehaviour, EmailBehaviour, 'complete'],
      sections: require('./sections/summary-data-sections'),
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
  }
};
