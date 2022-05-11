'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const APPEAL_STAGES = require('../lib/staticAppealStages').getstaticAppealStages();
const RRA_GROUPING = require('../lib/staticRraGrouping').getstaticRraGrouping();
const RRA_LEVELS = require('../lib/staticRraLevels').getstaticRraLevels();
const RRA_SCORES = require('../lib/staticRraScores').getstaticRraScores();
const _ = require('lodash');
const sumValues = values => values.map(it => Number(it)).reduce((a, b) => a + b, 0);

module.exports = {
  applicantsDetails: [
    'name',
    {
      field: 'dateOfBirth',
      parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
    }
  ],
  address: [
    'building',
    'street',
    'townOrCity',
    'postcode'
  ],
  income: [
    'incomeTypes'
  ],
  appealDetails: [
    'countryOfHearing',
    {
      field: 'appealStages',
      parse: v => _.get(_.find(APPEAL_STAGES, stage => stage.value === v), 'label', '')
    }
  ],
  contactDetails: [
    'email',
    'phone'
  ],
  countrySelect: [
    'countrySelect'
  ],
  complaintDetails: [
    'complaintDetails'
  ],
  weaponsTypes: [
    'weaponsTypes'
  ],
  personalDetails: [
    'rraName',
    'rraAdelphiNumber',
    'rraFunction',
    'rraEmail'
  ],
  appliedBefore: [
    'appliedBefore'
  ],
  professionDetails: [
    'rraRole',
    {
      field: 'rraGrouping',
      parse: v => _.get(_.find(RRA_GROUPING, group => group.value === v), 'label', '')
    },
    'rraGrade',
    {
      field: 'rraLevels',
      parse: v => _.get(_.find(RRA_LEVELS, group => group.value === v), 'label', '')
    }
  ],
  skill1: [
    'sfiaSkill1',
    {
      field: 'rraScores',
      parse: v => _.get(_.find(RRA_SCORES, group => group.value === v), 'label', '')
    },
    'rraEvidence',
    'rraSupportingDocuments'
  ],
  skill2: [
    'sfiaSkill2',
    {
      field: 'rraScores2',
      parse: v => _.get(_.find(RRA_SCORES, group => group.value === v), 'label', '')
    },
    'rraEvidence2',
    'rraSupportingDocuments2'
  ],
  totalScore: [
    {
      field: 'totalScore',
      derivation: {
        fromFields: [
          'rraScores',
          'rraScores2'
        ],
        combiner: sumValues
      }
    }
  ],
};
