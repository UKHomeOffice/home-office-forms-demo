'use strict';

const _ = require('lodash');

module.exports = {
  personalDetails: [
    'name', 'email'
  ],
  address: [
    'building',
    'street',
    'townOrCity',
    'postcode'
  ],
  emailQuery: [
    'emailSubject',
    'description'
  ]
};
