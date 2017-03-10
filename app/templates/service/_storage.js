'use strict';

const RedisStore = require('node-flint/storage/redis');
const storage = new RedisStore('redis://127.0.0.1');

module.exports = storage;
