# <%= botName %> [![Build Status](https://img.shields.io/travis/<%= githubUsername %>/<%= botName %>.svg?style=flat-square)](https://travis-ci.org/<%= githubUsername %>/<%= botName %>) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
> <%= botDescription %>

## Configure
Your bot's settings have already been configured during scaffolding, but these can be updated within the `.env` file.

## Commands
The bot will automatically register commands for any files defined in the `./commands` directory. These commands must export an object with a `trigger` and `callback` property.

### trigger | [`<RegEx>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The trigger that the bot will listen for, and the associated callback will be executed.

### callback | [`<function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
The function to be executed

## Usage
For local testing, [`ngrok`](https://ngrok.com/) can be used to set up a public proxy to point to your bot.

Start bot: `npm start`

## Unit Testing
Unit tests are set to run with [ava](https://github.com/avajs/ava). Commands are accessible through the following format: `commands.fileName`. Command's private methods can be tested on with the help of [rewire](https://github.com/jhnns/rewire) like so, `commands.fileName.__get__('privateMethod')`.

Run unit test: `ava [-v]`

<% if (heroku) { %>
## Deploy on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

<% } %>
## Credits
[generator-nm](https://github.com/sindresorhus/generator-nm) + [generator-generator] as an example to create the base of this generator.

## License

MIT © [<%= name %>](<%= website %>)
