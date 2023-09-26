'use strict';

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);

const sendEmail = (data, reference, emailSubject) => {
  const address = [data.building,  data.street, data.townOrCity, data.postcode].join('\n');
  
  return notifyClient.sendEmail(config.email.notifyTemplate, data.email, {
    personalisation: {
      emailSubject: emailSubject,
      name: data.name,
      email: data.email,
      address: address,
      description: data.description
    },
    reference
  });
};

const sendCaseworkerEmail = (data, reference, emailSubject) => {
  const address = [data.building,  data.street, data.townOrCity, data.postcode].join('\n');

  return notifyClient.sendEmail(config.email.caseworkerNotifyTemplate, config.email.caseworker, {
    personalisation: {
      emailSubject: emailSubject,
      name: data.name,
      email: data.email,
      address: address,
      description: data.description
    },
    reference
  });
};

module.exports = {
  sendEmail,
  sendCaseworkerEmail
};
