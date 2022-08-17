/* eslint-disable */
'use strict';

const _ = require('lodash');

const staticRraGrades = require('./lib/staticRraGrades');
const staticRraGrouping = require('./lib/staticRraGrouping');
const staticRraLevels = require('./lib/staticRraLevels');
const staticRraScores = require('./lib/staticRraScores');
const staticSfiaSkills = [...new Map(require('./lib/staticSfiaSkills').getstaticSfiaSkills().map(obj => [JSON.stringify(obj), obj])).values()];

module.exports = {
  rraName: {
    validate: 'required'
  },
  rraAdelphiNumber: {
    validate: ['required', 'numeric']
  },
  rraEmail: {
    validate: ['required', 'email']
  },
  rraPassword: {
    type:'password',
    validate: 'required'
  },
  appliedBefore: {
    legend: {
      className: 'visuallyhidden'
    },
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  rraFunction: {
    validate: 'required',
  },
  rraGrade: {
    mixin: 'select',
    validate: 'required',
    options:
      [{
        value: ' ',
        label: 'fields.rraGrade.options.null'
      }].concat(staticRraGrades.getstaticRraGrades())
  },
  rraGrouping: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.rraGrouping.options.null'
    }].concat(staticRraGrouping.getstaticRraGrouping())
  },
  rraLevels: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.rraLevels.options.null'
    }].concat(staticRraLevels.getstaticRraLevels())
  },
  rraSkill: {
    mixin: 'select',
    validate: 'required',
    options: [{
      value: ' ',
      label: 'fields.rraSkill.options.null'
    }].concat(staticSfiaSkills)
  },
  rraScores: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.rraScores.options.null'
    }].concat(staticRraScores.getstaticRraScores())
  },
  rraEvidence: {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' },{attribute: 'rows', value: 8}]
  },
  // rraSupportingDocuments: {
  //   mixin: 'input-file',
  //   className: 'govuk-file-upload'
  // },
  rraSkill2: {
    mixin: 'select',
    validate: 'required',
    options: [{
      value: ' ',
      label: 'fields.rraSkill2.options.null'
    }].concat(staticSfiaSkills)
  },
  rraScores2: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.rraScores2.options.null'
    }].concat(staticRraScores.getstaticRraScores())
  },
  rraEvidence2: {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' },{attribute: 'rows', value: 8}]
  },
  rraSupportingDocuments2: {
    mixin: 'input-file',
    className: 'govuk-file-upload'
  },
  rraSupportingDocumentsUpload: {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'rraSupportingDocuments',
      child: 'input-file'
    }, {
      value: 'no'
    }]
  },
  rraSupportingDocuments: {
    mixin: 'input-file',
    className: 'govuk-file-upload',
    disableRender: true,
    dependent: {
      field: 'rraSupportingDocumentsUpload',
      value: 'yes'
    },
    validate: [
      'required',
    ]
  },
  rraSupportingDocumentsUploadMore: {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'anotherRraSupportingDocuments',
      child: 'input-file',
    }, {
      value: 'no'
    }]
  },
  anotherRraSupportingDocuments: {
    mixin: 'input-file',
    disableRender: true,
    className: 'govuk-file-upload',
    dependent: {
      field: 'rraSupportingDocumentsUploadMore',
      value: 'yes'
    },
    validate: [
      'required'
    ]
  },
}
