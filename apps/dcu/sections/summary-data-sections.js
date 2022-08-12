'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const _ = require('lodash');
const SUBJECT_OPTIONS = require('../lib/emailSubjectOptions').getEmailSubjectOptions();

module.exports = {
  personalDetails: [
    'name', 'email',
    {
      field: 'dateOfBirth',
      parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
    }
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
