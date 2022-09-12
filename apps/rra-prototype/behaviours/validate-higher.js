module.exports = SuperClass => class extends SuperClass {
  validate(req, res, next) {
    const currentLevel = req.form.values.currentRraLevel;
    const applyingLevel = req.form.values.rraLevels;

    const sameLevel = currentLevel === applyingLevel;
    // eslint-disable-next-line max-len
    const lowerLevel = currentLevel === 'Expert' && applyingLevel === 'Practitioner' || currentLevel === 'Guru' && applyingLevel === 'Expert' || currentLevel === 'Guru' && applyingLevel === 'Practitioner';

    if (sameLevel || lowerLevel) {
      return next({
        rraLevels: new this.ValidationError(
          'rraLevels',
          {
            type: 'notSameOrLower'
          }
        ),
        currentRraLevel: new this.ValidationError(
          'currentRraLevel',
          {
            type: 'notSameOrLower'
          }
        )
      });
    } super.validate(req, res, next);
    return next;
  }
};
