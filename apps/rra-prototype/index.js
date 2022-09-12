/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const EmailBehaviour = require('./behaviours/send-email');
const SkillBehaviour = require('./behaviours/skills');
const Skill2Behaviour = require('./behaviours/skills2');
const higherSkillBehaviour = require('./behaviours/higherSkills');
const higherSkill2Behaviour = require('./behaviours/higherSkills2');
const saveImage = require('./behaviours/save-image');
const limitDocs = require('./behaviours/limit-documents');
const removeImage = require('./behaviours/remove-image');
const unsetValue = require('./behaviours/unset-value');
const checkDeviceType = require('./behaviours/check-device-type');
const skipStep = require('./behaviours/skip-step');
const checkAnswers = require('./behaviours/check-answers');
const resetJourneyToSubmitRRA = require('./behaviours/reset-journey-to-submit-rra');
const higherApp = require('./behaviours/higher-app');
const setAppType = require('./behaviours/set-app-type');
const validateHigherLevel = require('./behaviours/validate-higher');

module.exports = {
  name: 'rra-prototype',
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
      behaviours: [
        higherApp,
        resetJourneyToSubmitRRA
      ],
      fields: ['appliedBefore'],
      next: '/personalDetails',
      continueOnEdit: true

    },
    '/personalDetails': {
      behaviours: [
        setAppType,
        resetJourneyToSubmitRRA
      ],
      fields: ['rraName', 'rraAdelphiNumber','rraFunction', 'rraEmail'],
      forks: [{
        target: '/higherProfessionDetails',
        condition: req => {
          return req.sessionModel.get('appliedBefore') === 'yes' && req.sessionModel.get('higher-app');
        }
      }],
      next: '/professionDetails'
      // continueOnEdit: true
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
      fields: ['rraSkill2', 'rraScores2', 'rraEvidence2'],
      next: '/qualifications'
    },
    '/qualifications': {
      fields: ['qualifications'],
      next: '/rraSupportingDocumentsUpload'
    },
    '/higherProfessionDetails': {
      behaviours: [validateHigherLevel],
      fields: ['rraRole', 'rraGrouping', 'rraGrade','currentRraLevel', 'rraLevels'],
      next: '/lastAssessmentDate',
    },
    '/lastAssessmentDate':{
      fields: ['lastAssessmentDate'],
      next: '/previousScore',
    },
    '/previousScore': {
      fields: [ 'previousScore'],
      next: '/higherSkill1',
    },
    '/higherSkill1': {
      behaviours: [higherSkillBehaviour],
      fields: ['higherRraSkill', 'higherRraScores', 'higherRraEvidence'],
      next: '/higherSkill2'
    },
    '/higherSkill2': {
      behaviours: [higherSkill2Behaviour],
      fields: ['higherRraSkill2', 'higherRraScores2', 'higherRraEvidence2'],
      next: '/cpd'
    },
    '/cpd': {
      fields: ['cpdDescription'],
      continueOnEdit: true,
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
      // backLink: '',
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
      behaviours: [saveImage('anotherRraSupportingDocuments'), removeImage, unsetValue('rraSupportingDocumentsUploadMore'), limitDocs]
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
