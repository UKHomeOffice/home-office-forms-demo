'use strict';

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);

const sendEmail = (data, reference) => {
  const subject = data.rraName + ' - ' + data.rraGrouping + ' - ' + data.rraLevels + ' - 1st App';

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
      'skill-score': data.rraScores,
      'skill-evidence': data.rraEvidence,
      'supporting-documents': data.rraSupportingDocuments,
      skill2: data.rraSkill2,
      'skill-score2': data.rraScores2,
      'skill-evidence2': data.rraEvidence2,
      'supporting-documents2': data.rraSupportingDocuments
    },
    reference
  });
};

module.exports = {
  sendEmail
};
