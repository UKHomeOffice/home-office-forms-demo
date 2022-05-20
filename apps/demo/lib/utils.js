'use strict';

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);

const sendEmail = (data, reference) => {
  const subject = 'RRA - ' + data.rraName + ' - ' + data.rraGrouping + ' - '  + data.rraLevels + ' - 1st App';
  return notifyClient.sendEmail(config.email.notifyTemplate, config.email.caseworker, {
    personalisation: {
      subject: subject,
      name: data.rraName,
      number: data.rraAdelphiNumber,
      portfolio: data.rraFunction,
      email: data.rraEmail,
      appliedBefore: data.appliedBefore,
      role: data.rraRole,
      grouping: data.rraGrouping,
      grade: data.rraGrade,
      level: data.rraLevels,
      skill1: data.rraSkill,
      skill1Score: data.rraScores,
      skill1Evidence: data.rraEvidence,
      skill1SupportingDocument: data.rraSupportingDocuments,
      skill2: data.rraSkill2,
      skill2Score: data.rraScores2,
      skill2Evidence: data.rraEvidence2,
      skill2SupportingDocument: data.rraSupportingDocuments2
    },
    reference
  });
};

module.exports = {
  sendEmail
};
