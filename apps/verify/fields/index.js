'use strict';

// const { isValidEmail } = require('../../common/validators.js');

module.exports = {
  rraEmail: {
    mixin: 'input-text',
    className: ['form-control form-control-3-4'],
    validate: ['required', 'email', {type: 'maxlength', arguments: [15000]}]
  },
  'confirm-email': {
    mixin: 'input-text',
    validate: ['required', 'email', {type: 'maxlength', arguments: [15000]}]
  }
};
