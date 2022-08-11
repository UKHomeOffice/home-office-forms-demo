/* eslint-disable */
'use strict';

const _ = require('lodash');

const dateComponent = require('hof').components.date;
const staticAppealStages = require('./lib/staticAppealStages');

function notBothOptions(vals) {
  const values = _.castArray(vals);
  return !(values.length > 1 && values.indexOf('unspecified') > -1);
}

module.exports = {
  chooseAForm: {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'basic',
      'complex',
      'build-your-own-form'
    ]
  },
  name: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }],
  },
  dateOfBirth: dateComponent('dateOfBirth', {
    mixin: 'input-date',
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
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  postcode: {
    validate: ['required', 'postcode'],
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  incomeTypes: {
    mixin: 'checkbox-group',
    isPageHeading: true,
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
    isPageHeading: true,
    validate: ['required'],
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
    validate: ['required', 'internationalPhoneNumber'],
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'int-phone-number': {
    validate: ['required'],
    labelClassName: 'visuallyhidden',
    className: ['govuk-input', 'govuk-input--width-20']
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
    isPageHeading: true,
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
    ],
    legend: {
      className: 'govuk-fieldset__legend--m'
    }
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
  'email-verify': {
    validate: ['required', 'email']
  }
}
