'use strict';

module.exports = function encodeEmail(email) {
  return Buffer.from(email).toString('hex');
};
