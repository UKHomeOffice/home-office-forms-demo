'use strict';

const redis = require('../../demo/lib/redis');
const uuid = require('uuid');
const tokenExpiry = require('../../../config').tokenExpiry;

module.exports = {
  save(email, organisation) {
    const token = uuid.v1();
    redis.set(`token:${token}`, token);
    redis.set(`${token}:email`, email);
    redis.set(`${token}:organisation`, organisation);
    redis.expire(`token:${token}`, tokenExpiry);
    redis.expire(`${token}:email`, tokenExpiry);
    redis.expire(`${token}:organisation`, tokenExpiry);

    return token;
  }
};
