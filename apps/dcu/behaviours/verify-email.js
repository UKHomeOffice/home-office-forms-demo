// 'use strict';

module.exports = SuperClass => class extends SuperClass {
  validate(req, res, next) {
    if (req.form.values.email !== req.form.values.emailVerify) {
      return next({
        emailVerify: new this.ValidationError(
          'emailVerify',
          {
            type: 'notSame'
          }
        ),
        email: new this.ValidationError(
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
