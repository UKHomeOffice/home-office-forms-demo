'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const currentSteps = req.sessionModel.get('steps');
    const formSteps = Object.keys(req.form.options.steps);
    const stepsBeforeProfessionQuestion = formSteps.slice(0, formSteps.indexOf('/personalDetails') + 1);
    const filteredSteps = currentSteps.filter(step => stepsBeforeProfessionQuestion.includes(step));

    req.sessionModel.set('steps', filteredSteps);

    return super.saveValues(req, res, next);
  }
};
