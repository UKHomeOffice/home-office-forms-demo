'use strict';

const _ = require('lodash');
const sumValues = values => values.map(it => Number(it)).reduce((a, b) => a + b, 0);

module.exports = superclass => class TotalScore extends superclass {
  configure(req, res, next) {
    let skill1 = parseInt(req.sessionModel.attributes.rraScores)
    let skill2 = parseInt(req.sessionModel.attributes.rraScores2)

    console.log('hello');
    // skills: { aggregatedValues: [Array] },
    if(req.sessionModel.attributes.skills !== undefined){
      const addSkillScores = req.sessionModel.attributes.skills.aggregatedValues.map(item => {
        return item.fields[1].value
       })
       console.log(sumValues(addSkillScores) + skill1 + skill2)
       console.log(req.sessionModel.get('rraEmail'));
       console.log(req.sessionModel.get('totalScore'));
      //  console.log(req.sessionModel);
    }
    
    
   
   next();
  }
};
