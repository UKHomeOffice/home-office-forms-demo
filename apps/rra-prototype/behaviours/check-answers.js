'use strict';
const _ = require('lodash');

module.exports = superclass => class extends superclass {
  locals(req, res) {
    res.locals.images = req.sessionModel.get('images');
    return super.locals(req, res);
  }
};
