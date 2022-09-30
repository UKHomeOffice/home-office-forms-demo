'use strict';

/* eslint no-process-env: 0 */
const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS === 'true' || !env;

module.exports = {
  env: env,
  csp: {
    imgSrc: ['data:']
  },
  useMocks: useMocks,
  upload: {
    maxFileSize: '100mb',
    // if mocks set use file service served up by app otherwise use filevault's port 3000
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://localhost:${useMocks ? (process.env.PORT || 8080) : 3000}/file`
  },
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    notifyApiKey: process.env.NOTIFY_KEY ||
    'hof_test-89548f6c-39cd-4acb-851c-1f4ffa2e479b-28426e56-443a-4ba4-98ed-fb576e717ed9',
    notifyTemplate: process.env.NOTIFY_TEMPLATE || 'e3f83bba-3491-45ef-a9ba-984fbe0e27da',
    notifyHigherTemplate: process.env.NOTIFY_HIGHER_TEMPLATE || '1fa1fe19-9d26-4e37-bbb5-358d9493f2a3',
    templateUserAuthId: process.env.TEMPLATE_USER_AUTHORISATION_ID || 'b9176c11-6047-4f55-a190-5f08c32d6ad5',
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
  tokenExpiry: 1800,
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  skipEmail: process.env.SKIP_EMAIL,
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  }
};
