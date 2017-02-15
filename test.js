'use strict';
import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

test.serial('Test standard scaffold', async () => {
	await helpers
		.run(path.join(__dirname, '/app'))
		.withPrompts({
			botName: 'my-awesome-bot',
			githubUsername: 'tester',
			website: 'helloworld',
			webhookUrl: 'testing.ngrok.io',
			token: 'token1234',
			port: 5000,
			heroku: true
		});

	// Core Code Intact
	assert.file([
		'app.js',
		'test.js',
		'.env',
		'.gitignore',
		'app.json', // Heroku True
		'config.js',
		'commands/example.js'
	]);

	// Tpl Assertions
	assert.fileContent([
		['readme.md', /https:\/\/img.shields.io\/travis\/tester\/my-awesome-bot.svg/],
		['.env', /token1234/],
		['.env', /testing.ngrok.io/],
		['.env', /5000/]
	]);

	assert.noFileContent([
		['readme.md', /<%.*%>/],
		['.env', /<%.*%>/]
	]);
});

test.serial('Test command sub-generator', async () => {
	await helpers
		.run(path.join(__dirname, '/command'))
		.withPrompts({
			commandName: 'test-command',
			triggerPhrase: 'test-phrase'
		});

	// Core Code Intact
	assert.file([
		'commands/test-command.js'
	]);

	// Tpl Assertions
	assert.fileContent([
		['commands/test-command.js', /test-command/],
		['commands/test-command.js', /test-phrase/]
	]);

	// Check to make sure no lingering tpls
	assert.noFileContent([
		['commands/test-command.js', /<%.*%>/],
	]);
});
