'use strict';

const _ = require('lodash');
const SUBJECT_OPTIONS = require('../lib/emailSubjectOptions').getEmailSubjectOptions();

module.exports = {
  personalDetails: [
    'name', 'email'
  ], address: [
    'building',
    'street',
    'townOrCity',
    'postcode'
  ], emailQuery: [
    {
      field: 'emailSubject',
      parse: v => _.get(_.find(SUBJECT_OPTIONS, stage => stage.value === v), 'label', '')
    },
    'description'
  ]
};
