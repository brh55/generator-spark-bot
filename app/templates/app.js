'use strict';

const path = require('path');
const webhook = require('node-flint/webhook');
const bodyParser = require('body-parser');
const requireAll = require('require-all');
const app = require('express')();
const CONFIG = require('./config');

// Only set bodyParser to Flint intended route
// remove first parameter if you wish to apply to all
app.use('/flint', bodyParser.json());
const flint = require('./service/flint');
const sparky = flint.spark;

<% if (redis) { %>
const RedisStore = require('node-flint/storage/redis');
flint.storageDriver(new RedisStore('redis://127.0.0.1'));
<% } %>

registerCommands(flint);

app.post('/flint', webhook(flint));
var server = app.listen(CONFIG.port, () =>
	flint.debug('Flint listening on port %s', CONFIG.port));

process.on('SIGINT', () => {
	flint.debug('Bot shutting down...');
	server.close();
	flint.stop().then(() => process.exit());
});

/**
 * Finds commands within the commands directory to
 * register triggers and callbacks for flint
 * @param  {object} flint flint instance
 */
function registerCommands(flint) {
	const commands = requireAll(path.join(__dirname, 'commands'));
	Object.keys(commands)
		.forEach(name => flint.hears(commands[name].trigger, commands[name].callback));
}
