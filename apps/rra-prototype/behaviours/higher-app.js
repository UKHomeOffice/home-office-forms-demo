'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const higherRateApp = req.form.values.appliedBefore !== 'no';
    const currentSteps = req.sessionModel.get('steps');
    const previouslyAnsweredAppliedBefore = currentSteps.includes(['/professionDetails', '/skill1', '/skill2']);

    req.sessionModel.set('higher-app', higherRateApp);

    // this updates fields and change links for the in-progress check your answers page
    // when accessing a case from the reports dashboard
    if (higherRateApp) {
      req.sessionModel.set('appliedBefore', 'yes');
      req.sessionModel.set('is-higher', true);
      req.sessionModel.unset('rraSkill');
      req.sessionModel.unset('rraScores');
      req.sessionModel.unset('rraEvidence');
      req.sessionModel.unset('rraSkill2');
      req.sessionModel.unset('rraScores2');
      req.sessionModel.unset('rraEvidence2');
    } else if (!previouslyAnsweredAppliedBefore) {
      req.sessionModel.unset('currentRraLevel');
      req.sessionModel.unset('lastAssessmentDate');
      req.sessionModel.unset('previousScore');
      req.sessionModel.unset('higherRraSkill');
      req.sessionModel.unset('higherRraScores');
      req.sessionModel.unset('higherRraEvidence');
      req.sessionModel.unset('higherRraSkill2');
      req.sessionModel.unset('higherRraScores2');
      req.sessionModel.unset('higherRraEvidence2');
      req.sessionModel.unset('cpdDescription');
      req.sessionModel.unset('is-higher');
    }

    return super.saveValues(req, res, next);
  }
};
