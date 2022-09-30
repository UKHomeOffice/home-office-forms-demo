'use strict';

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);

const sendEmail = (data, reference) => {
  let subject;
  let document;
  if (!data.images) {
    document = 'None given';
  } else {
    document = data.images.map(docs => { return docs.name; });
  }

  if (data.appliedBefore === 'no') {
    subject = 'RRA - ' + data.rraName + ' - ' + data.rraGrouping + ' - ' + data.rraLevels + ' - 1st App';

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
        skill2: data.rraSkill2,
        skill2Score: data.rraScores2,
        skill2Evidence: data.rraEvidence2,
        supportingDocuments: document
      },
      reference
    });
  }
  subject = 'RRA - ' + data.rraName + ' - ' + data.rraGrouping + ' - ' + data.rraLevels + ' - Higher Rate';

  return notifyClient.sendEmail(config.email.notifyHigherTemplate, config.email.caseworker, {
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
      currentLevel: data.currentRraLevel,
      lastAssessmentDate: data.lastAssessmentDate,
      previousScore: data.previousScore,
      level: data.rraLevels,
      higherSkill1: data.higherRraSkill,
      higherSkill1Score: data.higherRraScores,
      higherSkill1Evidence: data.higherRraEvidence,
      higherSkill2: data.higherRraSkill2,
      higherSkill2Score: data.higherRraScores2,
      higherSkill2Evidence: data.higherRraEvidence2,
      professionalDev: data.cpdDescription,
      supportingDocuments: document
    },
    reference
  });
};

module.exports = {
  sendEmail
};
