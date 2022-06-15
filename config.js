'use strict';

/* eslint no-process-env: 0 */
const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;

module.exports = {
  env: env,
  hostUrl: process.env.HOST_URL || 'http://localhost:8080',
  upload: {
    maxfilesize: '100mb',
    hostname: (!env || env === 'ci') ?
      `http://${localhost()}/api/file-upload` :
      process.env.FILE_VAULT_URL
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  skipEmail: process.env.SKIP_EMAIL,
  allowSkip: String(process.env.ALLOW_SKIP) === 'true',
  tokenExpiry: 1800,
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    notifyApiKey: process.env.NOTIFY_KEY ||
    'hof_test-89548f6c-39cd-4acb-851c-1f4ffa2e479b-28426e56-443a-4ba4-98ed-fb576e717ed9',
    notifyTemplate: process.env.NOTIFY_TEMPLATE || 'e3f83bba-3491-45ef-a9ba-984fbe0e27da',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: 'ses',
    region: process.env.EMAIL_REGION || ''
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  govukNotify: {
    notifyApiKey: `${process.env.NOTIFY_KEY}` || '',
    templateUserAuthId: process.env.TEMPLATE_USER_AUTHORISATION_ID || 'fe0408cb-24f0-4b5f-9bdb-6569834039fb',

  }
};
