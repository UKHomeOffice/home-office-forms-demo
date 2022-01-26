'use strict';

const path = require('path');

const pagesPath = page => path.resolve(__dirname,
  `./apps/demo/acceptance/pages/${page}`);

module.exports = {
  name: 'demo',
  include: {
    firstPage: pagesPath('first-step.js'),
    secondPage: pagesPath('second-step.js'),
    thirdPage: pagesPath('third-step.js')
  }
};
