/* eslint-disable */
'use strict';

const _ = require('lodash');

const dateComponent = require('hof').components.date;
const staticAppealStages = require('./lib/staticAppealStages');
const staticRraGrades = require('./lib/staticRraGrades');
const staticRraGrouping = require('./lib/staticRraGrouping');
const staticRraLevels = require('./lib/staticRraLevels');
const staticRraScores = require('./lib/staticRraScores');
const staticSfiaSkills = require('./lib/staticSfiaSkills');

function notBothOptions(vals) {
  const values = _.castArray(vals);
  return !(values.length > 1 && values.indexOf('unspecified') > -1);
}

module.exports = {
  name: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }],
  },
  dateOfBirth: dateComponent('dateOfBirth', {
    validate: ['required', 'before', { type: 'after', arguments: ['1900'] }]
  }),
  building: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  street: {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  townOrCity: {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  postcode: {
    validate: ['required', 'postcode'],
    formatter: ['removespaces', 'uppercase']
  },
  incomeTypes: {
    mixin: 'checkbox-group',
    labelClassName: 'visuallyhidden',
    validate: ['required'],
    options: [
      'salary',
      'universal_credit',
      'child_benefit',
      'housing_benefit',
      'other'
    ]
  },
  countryOfHearing: {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'englandAndWales',
      'scotland',
      'northernIreland'
    ]
  },
  email: {
    validate: ['required', 'email']
  },
  phone: {
    validate: ['required', 'internationalPhoneNumber']
  },
  'int-phone-number': {
    validate: ['required'],
    labelClassName: 'visuallyhidden'
  },
  countrySelect: {
    mixin: 'select',
    className: ['typeahead'],
    options:[''].concat(require('homeoffice-countries').allCountries),
    legend: {
      className: 'visuallyhidden'
    },
    validate: ['required']
  },
  complaintDetails: {
    mixin: 'textarea',
    labelClassName: 'visuallyhidden',
    // we want to ignore default formatters as we want
    // to preserve white space
    'ignore-defaults': true,
    // apply the other default formatters
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    // attributes here are passed to the field element
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },
  weaponsTypes:{
    mixin: 'checkbox-group',
    labelClassName: 'visuallyhidden',
    validate: ['required', notBothOptions],
    options: [
      {
        value: 'unspecified',
        child: 'partials/or'
      },
      'fully_automatic',
      'self_loading',
      'short_pistols',
      'short_self_loading',
      'large_revolvers',
      'rocket_launchers',
      'air_rifles',
      'fire_noxious_substance',
      'disguised_firearms',
      'military_use_rockets',
      'projecting_launchers'
    ]
  },
  appealStages: {
    mixin: 'select',
    labelClassName: 'visuallyhidden',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.appealStages.options.null'
    }].concat(staticAppealStages.getstaticAppealStages())
  },
  rraName: {
    validate: 'required'
  },
  rraAdelphiNumber: {
    validate: ['required', 'numeric']
  },
  rraEmail: {
    validate: ['required', 'email']
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
      [{ value: ' ', 
      label: 'fields.appealStages.options.null' 
    }].concat(staticRraGrades.getstaticRraGrades())
  },
  rraGrouping: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.appealStages.options.null'
    }].concat(staticRraGrouping.getstaticRraGrouping())
  },
  rraLevels: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.appealStages.options.null'
    }].concat(staticRraLevels.getstaticRraLevels())
  },
  rraSkill: {
    mixin: 'select',
    validate: 'required',
    options: [{ 
      value: ' ', 
      label: 'fields.appealStages.options.null' 
    }].concat(staticSfiaSkills.getstaticSfiaSkills())
  },
  rraScores: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.appealStages.options.null'
    }].concat(staticRraScores.getstaticRraScores())
  },
  rraEvidence: {
    mixin: 'textarea',
    // we want to ignore default formatters as we want
    // to preserve white space
    'ignore-defaults': true,
    // apply the other default formatters
    formatter: ['trim', 'hyphens'],
    // attributes here are passed to the field element
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },
  rraSupportingDocuments: {
    mixin: 'input-file'
  },
  rraSkill2: {
    mixin: 'select',
    validate: 'required',
    options: [{ 
      value: ' ', 
      label: 'fields.appealStages.options.null' 
    }].concat(staticSfiaSkills.getstaticSfiaSkills())
  },
  rraScores2: {
    mixin: 'select',
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.appealStages.options.null'
    }].concat(staticRraScores.getstaticRraScores())
  },
  rraEvidence2: {
    mixin: 'textarea',
    // we want to ignore default formatters as we want
    // to preserve white space
    'ignore-defaults': true,
    // apply the other default formatters
    formatter: ['trim', 'hyphens'],
    // attributes here are passed to the field element
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },
  rraSupportingDocuments2: {
    mixin: 'input-file'
  }
}
