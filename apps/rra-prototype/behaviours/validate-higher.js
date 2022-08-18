// module.exports = SuperClass => class extends SuperClass {
//   validate(req, res, next) {
//     if (req.form.values.currentRraLevel === req.form.values.rraLevels || req.form.values.currentRraLevel === 'Expert' && req.form.values.rraLevels === 'Practitioner' || req.form.values.currentRraLevel === 'Guru' && req.form.values.rraLevels === 'Expert') {
//       return next({
//         rraLevels: new this.ValidationError(
//           'rraLevels',
//           {
//             type: 'notSameOrLower'
//           }
//         )
//       });
//     } super.validate(req, res, next);
//     return next;
//   }
// };

module.exports = SuperClass => class extends SuperClass {
  validate(req, res, next) {
    const sameLevel = req.form.values.currentRraLevel === req.form.values.rraLevels;
    const lowerLevel = req.form.values.currentRraLevel === 'Expert' && req.form.values.rraLevels === 'Practitioner' || req.form.values.currentRraLevel === 'Guru' && req.form.values.rraLevels === 'Expert' || req.form.values.currentRraLevel === 'Guru' && req.form.values.rraLevels === 'Practitioner'
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