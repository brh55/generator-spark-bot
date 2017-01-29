'use strict';

require('dotenv').config();

const config = {
	webhookUrl: process.env.WEBHOOK_URL || '',
	token: process.env.TOKEN || '',
	port: process.env.PORT || 5000
};

module.exports = config;
