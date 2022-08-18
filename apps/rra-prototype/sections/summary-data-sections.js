'use strict';

const RRA_GROUPING = require('../lib/staticRraGrouping').getstaticRraGrouping();
const RRA_LEVELS = require('../lib/staticRraLevels').getstaticRraLevels();
const RRA_SCORES = require('../lib/staticRraScores').getstaticRraScores();
const _ = require('lodash');
const sumValues = values => values.map(it => Number(it)).reduce((a, b) => a + b, 0);

module.exports = {
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
    'rraSkill',
    {
      field: 'rraScores',
      parse: v => _.get(_.find(RRA_SCORES, group => group.value === v), 'label', '')
    },
    'rraEvidence',
  ],
  skill2: [
    'rraSkill2',
    {
      field: 'rraScores2',
      parse: v => _.get(_.find(RRA_SCORES, group => group.value === v), 'label', '')
    },
    'rraEvidence2'
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
  ]
};
