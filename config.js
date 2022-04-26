'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || 'mohamed.uwais@digital.homeoffice.gov.uk',
    notifyApiKey: process.env.NOTIFY_KEY || 'hof_test-89548f6c-39cd-4acb-851c-1f4ffa2e479b-28426e56-443a-4ba4-98ed-fb576e717ed9',
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
  }
};
