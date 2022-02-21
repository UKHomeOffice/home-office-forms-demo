'use strict';

const axios = require('axios');
const moment = require('moment');
const baseUrl = 'http://localhost:3000/forms/';
const _ = require('lodash');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['saveEmail', 'csrf-secret'];

    cleanList = cleanList.filter(item => keepList.indexOf(item) === -1);

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/forms']);
  }

  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      previousForms: _.sortBy(req.formResults, 'id').reverse()
    });
    const locals = Object.assign({}, superlocals, data);
    return locals;
  }

  getValues(req, res, next) {
    this.cleanSession(req);

    super.getValues(req, res, err => {
      if (err) {
        next(err);
      }
      axios.get(baseUrl + encodeEmail(req.sessionModel.get('saveEmail')))
        .then(function (response) {
          const resBody = response.data;
          if (resBody && resBody.length && resBody[0].session) {
            req.formResults = [];
            resBody.forEach(form => {
              const created = moment(form.created_at);
              const updated = moment(form.updated_at);
              const formSession = {
                id: form.id,
                reference: JSON.stringify(form.session.reference),
                createdAt: created.format('DD MMMM YYYY'),
                updatedAt: updated.format('DD MMMM YYYY')
              };
              req.formResults.push(formSession);
            });
          }
        })
        // redirect to /name if the localhost database is not running
        // .catch(function () {
        //   return res.redirect('/feature/forms');
        // })
        .then(function () {
          next();
        });
    });
  }
};
