'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');
const path = require('path');

if (process.env.REDIS_URL) {
  config.redis = process.env.REDIS_URL;
}

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  routes: settings.routes.map(require),
  behaviours: settings.behaviours.map(require),
  redis: config.redis,
  csp: config.csp,
  views: settings.views.map(view => path.resolve(__dirname, view))
});

const app = hof(settings);

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  next();
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;
