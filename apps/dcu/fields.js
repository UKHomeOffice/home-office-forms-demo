/* eslint-disable */
'use strict';

module.exports = {
  'api-search': {
    validate: ['required']
  },
  'still-contact': {
    mixin: 'radio-group',
    legend: {
      className: ['bold']
    },
    options: [
      {
        value: 'yes'
        // toggle: 'contact-details-fieldset',
        // child: 'partials/contact-details'
      },
      {
        value: 'no',
        toggle: 'feedback-link-fieldset',
        child: 'partials/feedback-link'
      }
    ]
  },
  name: {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }],
  },
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
  email: {
    validate: ['required', 'email']
  },
  emailVerify: {
    validate: ['required', 'email']
  },
  emailSubject: {
    mixin: 'input-text',
    validate: ['required']
  },
  description: {
    mixin: 'textarea',
    // we want to ignore default formatters as we want
    // to preserve white space
    'ignore-defaults': true,
    // apply the other default formatters
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 1000 }],
    // attributes here are passed to the field element
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },
}
