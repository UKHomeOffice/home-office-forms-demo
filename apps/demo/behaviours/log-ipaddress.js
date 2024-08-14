/* eslint-disable no-console */
'use strict';

module.exports = SuperClass => class extends SuperClass {
  getValues(req, res, next) {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    console.log('ipaddress', ip);
    return super.getValues(req, res, next);
  }
};
