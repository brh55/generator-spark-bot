const path = require('path');
const Flint = require('node-flint');
const webhook = require('node-flint/webhook');
const bodyParser = require('body-parser');
const requireAll = require('require-all');
const app = require('express')();

const CONFIG = require('./config');

app.use(bodyParser.json());

// Flint
var flint = new Flint(CONFIG);
flint.messageFormat = 'markdown';
flint.start();
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
