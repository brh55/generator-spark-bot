'use strict';
import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

test('Test standard scaffold', async t => {
    let generator = await helpers
                        .run(path.join(__dirname, '/app'))
                        .withPrompts({
                            botName: 'my-awesome-bot',
                            githubUsername: 'tester',
                            webhookUrl: 'testing.ngrok.io',
                            token: 'token1234',
                            port: 5000,
                            heroku: true
                        });


    // assert.file('app.json');

    // // Core Code Intact
    // assert.file('app.js');
    // assert.file('test.js');
    // assert.file('.env');
    // assert.file('config.js');
    // assert.file('commands/example.js');

    // Tpl Assertions
    assert.fileContent('readme.md', /https:\/\/img.shields.io\/travis\/tester\/my-awesome-bot.svg/)
});
