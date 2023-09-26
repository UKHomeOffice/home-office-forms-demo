'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: 'ses',
    region: process.env.EMAIL_REGION || '',
    // eslint-disable-next-line max-len
    notifyApiKey: process.env.NOTIFY_KEY || 'dcu_test-89548f6c-39cd-4acb-851c-1f4ffa2e479b-f878505d-58e2-4eca-995f-c52a76a5526f',
    notifyTemplate: process.env.NOTIFY_TEMPLATE || 'ae41ea46-76b1-4306-af1c-fe73bfe35187',
    caseworkerNotifyTemplate: process.env.CASEWORKER_NOTIFY_TEMPLATE || '6c0aa3e3-d088-4035-ae53-ed6b14b47363'
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  }
};
