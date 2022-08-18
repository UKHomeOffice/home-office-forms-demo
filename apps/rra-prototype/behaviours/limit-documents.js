module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const images = req.sessionModel.get('images')
    if (images.length > 6) {
      return next({
        rraSupportingDocumentsUploadMore: new this.ValidationError(
          'rraSupportingDocumentsUploadMore',
          {
            type: 'tooMany'
          }
        ),
      });
    } super.validate(req, res, next);
    return next;
  }
};
