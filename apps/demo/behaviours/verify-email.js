// 'use strict';

module.exports = SuperClass => class extends SuperClass {
  validate(req, res, next) {
    if (req.form.values['email'] !== req.form.values['email-verify']) {
      return next({
        'email-verify': new this.ValidationError(
          'email-verify',
          {
            type: 'notSame'
          }
        ),
        'email': new this.ValidationError(
          'email',
          {
            type: 'notSame'
          }
        )
      });
    } super.validate(req, res, next);
    return next;
  }
};