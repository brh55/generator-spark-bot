import path from 'path';
import {readdirSync} from 'fs';
import test from 'ava';
import rewire from 'rewire';

var commands = {};
var commandFiles = readdirSync(`${__dirname}/commands`).map(file => `${__dirname}/commands/${file}`);
commandFiles
	.map(commandPath => path.basename(commandPath, '.js'))
	.forEach((commandName, index) => {
		commands[commandName] = rewire(commandFiles[index]);
	});

test('Test example command', t => {
	const buildExampleMessage = commands.example.__get__('buildExampleMessage');
	t.is(buildExampleMessage('help'), 'I heard "help", so I wanted to say hi!');
});
