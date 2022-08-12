'use strict';

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);


const sendEmail = (data, reference, emailSubject) => {
  const subject = 'DCU - ' + data.emailSubject;
  return notifyClient.sendEmail(config.email.notifyTemplate, config.email.caseworker, {
    personalisation: {
      subject: subject,
      emailSubject: emailSubject,
      name: data.name,
      email: data.email,
      description: data.description
    },
    reference
  });
};

module.exports = {
  sendEmail
};
