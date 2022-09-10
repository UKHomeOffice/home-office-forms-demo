'use strict'; const fs = require('fs');
const path = require('path');
const moment = require('moment');
const _ = require('lodash');
const PDFModel = require('hof').apis.pdfConverter;

const config = require('../../../config');
const apiKey = config.email.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(apiKey);

module.exports = class SendEmail {
  constructor(behaviourConfig) {
    this.behaviourConfig = behaviourConfig;
  }

  readCss() {
    return new Promise((resolve, reject) => {
      const cssFile = path.resolve(__dirname, '../../../public/css/app.css');
      fs.readFile(cssFile, (err, data) => err ? reject(err) : resolve(data));
    });
  }

  readHOLogo() {
    return new Promise((resolve, reject) => {
      const hoLogoFile = path.resolve(__dirname, '../../../assets/images/ho-logo.png');
      fs.readFile(hoLogoFile, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(`data:image/png;base64,${data.toString('base64')}`);
      });
    });
  }

  async renderHTML(req, res, locs) {
    let locals = locs;

    if (this.behaviourConfig.sortSections) {
      locals = this.sortSections(locs);
    }

    locals.title = `Recruitment and Retention Application ${this.behaviourConfig.component}`;
    locals.dateTime = moment().format(config.dateTimeFormat);
    locals.values = req.sessionModel.toJSON();
    locals.htmlLang = res.locals.htmlLang || 'en';

    locals.css = await this.readCss(req);
    locals['ho-logo'] = await this.readHOLogo();
    return new Promise((resolve, reject) => {
      res.render('pdf.html', locals, (err, html) => err ? reject(err) : resolve(html));
    });
  }

  async sendEmail(req, res, locals, data, reference) {
    data = req.sessionModel.toJSON();
    const html = this.renderHTML(req, res, locals);
    const pdfModel = new PDFModel();
    pdfModel.set({ template: html });
    const pdfData = await pdfModel.save();

    let subject;
    let document;
    if (!data.images) {
      document = 'None given';
    } else {
      document = data.images.map(docs => { return docs.name; });
    }
    if (data.appliedBefore === 'no') {
      subject = 'RRA - ' + data.rraName + ' - ' + data.rraGrouping + ' - ' + data.rraLevels + ' - 1st App';

      return await notifyClient.sendEmail(config.email.notifyTemplate, config.email.caseworker, pdfData, {
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
        reference,
        'form id': notifyClient.prepareUpload(pdfData)
      });
    }
    subject = 'RRA - ' + data.rraName + ' - ' + data.rraGrouping + ' - ' + data.rraLevels + ' - Higher Rate';

    return await notifyClient.sendEmail(config.email.notifyHigherTemplate, config.email.caseworker, pdfData, {
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
      reference,
      'form id': notifyClient.prepareUpload(pdfData)
    });
  };

  sortSections(locals) {
    const appName = this.behaviourConfig.app;

    const translations = require(`../../${appName}/translations/src/en/pages.json`);
    const sectionHeaders = Object.values(translations.confirm.sections);
    const orderedSections = _.map(sectionHeaders, obj => obj.header);
    let rows = locals.rows;

    rows = rows.slice().sort((a, b) => orderedSections.indexOf(a.section) - orderedSections.indexOf(b.section));

    locals.rows = rows;
    return locals;
  }
};
