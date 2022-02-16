/* eslint-disable */
'use strict';

module.exports = {
  saveEmail: {
    validate: ['required', 'email']
  },
  reference: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 20 }],
  },
  name: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }],
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
  textArea: {
    mixin: 'textarea',
    labelClassName: 'visuallyhidden',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 5000 }],
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },

}