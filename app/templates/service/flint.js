'use strict';

const Flint = require('node-flint');
const CONFIG = require('../config');
let flint = new Flint(CONFIG);
flint.messageFormat = 'markdown';
flint.start();

module.exports = flint;
