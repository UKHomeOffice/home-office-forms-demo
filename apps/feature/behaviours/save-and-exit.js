'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      userEmail: req.sessionModel.get('saveEmail')
    });
    const locals = Object.assign({}, superlocals, data);

    req.sessionModel.reset();

    return locals;
  }
};
