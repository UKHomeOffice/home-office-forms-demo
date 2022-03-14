'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/forms/';
const encodeEmail = require('../lib/encode-email');


module.exports = superclass => class extends superclass {
  // remove email row from the continue-form page
  locals(req, res) {
    const rows = this.getRowsForSummarySections(req);
    const rowsFiltered = rows.slice(1);
    return Object.assign({}, super.locals(req, res), {
      rowsFiltered
    });
  }

  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['saveEmail', 'csrf-secret'];

    cleanList = cleanList.filter(item => keepList.indexOf(item) === -1);

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/forms']);
  }

  getValues(req, res, next) {
    super.getValues(req, res, err => {
      if (err) {
        next(err);
      }
      const id = req.query.id;
      if (!id) {
        return res.redirect('/feature/forms');
      }
      this.cleanSession(req);

      const url = baseUrl + encodeEmail(req.sessionModel.get('saveEmail')) + '/' + id;
      return axios.get(url)
        .then(function (response) {
          const resBody = response.data;
          if (resBody && resBody.length && resBody[0].session) {
            const session = resBody[0].session;
            delete session['csrf-secret'];
            delete session.errors;
            session.steps = session.steps.filter(step => !step.match(/\/change|edit$/));
            req.sessionModel.set(session);
            req.sessionModel.set('id', id);
            next();
          }
        });
    });
  }

  // redirects to the next question
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      return res.redirect('/feature/confirm');
    });
  }
};
