# <%= botName %> [![Build Status](https://img.shields.io/travis/<%= githubUsername %>/<%= botName %>.svg?style=flat-square)](https://travis-ci.org/<%= githubUsername %>/<%= botName %>) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
> <%= botDescription %>

## Configure
Your bot's settings have already been configured during scaffolding, but these can be updated within the `.env` file.

## Scripts
- `npm run test` - Run linter and unit test
- `npm start` - Start the bot

## Commands
The bot will automatically register commands for any files defined in the `./commands` directory. These commands must follow an interface that exports a `trigger` property and `callback` method.

### `yo spark-bot:command`

For your convenience, the `:command` sub-generator will generate a new command within the `/commands` directory. Run the command within your project directory.


### trigger | [`<RegEx>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The contextual trigger that will cause the bot to execute the callback upon matches.

### callback | [`<function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

The function to be executed

## Usage
For local testing, [`ngrok`](https://ngrok.com/) can be used to set up a public proxy to point to your bot.

Start bot: `npm start`

In addition, a global installation of [nodemon](https://github.com/remy/nodemon) is highly recommended. This will assist in code changes to be tested against the bot without having to manually shutdown the bot.

## Unit Testing
Unit tests are set to run with [ava](https://github.com/avajs/ava). Commands are accessible through the following format: `commands.fileName`. Command's private methods can be tested on with the help of [rewire](https://github.com/jhnns/rewire) like so, `commands.fileName.__get__('privateMethod')`.

Run unit test: `ava [-v]`

<% if (heroku) { %>
## Deploy on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

<% } %>

## License

MIT © [<%= name %>](<%= website %>)
