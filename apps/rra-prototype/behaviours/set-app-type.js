'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    if (req.sessionModel.get('higher-app')) {
      req.form.values['appliedBefore'] = 'yes';
    }

    const isHigher = req.form.values['appliedBefore'] === 'yes';

    req.sessionModel.set('is-higher', isHigher);

    return super.saveValues(req, res, next);
  }
};
