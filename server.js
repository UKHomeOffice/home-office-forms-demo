'use strict';

const hof = require('hof');
let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  routes: settings.routes.map(require),
  behaviours: settings.behaviours.map(require)
});

const app = hof(settings);

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  next();
});

module.exports = app;
