global.chai = require('chai').use(require('sinon-chai'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');


global.reqres = require('hof').utils.reqres;
process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
