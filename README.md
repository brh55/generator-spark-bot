# generator-spark-bot [![Travis](https://img.shields.io/travis/brh55/generator-spark-bot.svg?style=flat-square)](https://travis-ci.org/brh55/generator-spark-bot) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

`generator-spark-bot` is a [yeoman](http://yeoman.io/) generator that scafolds out a node Cisco spark bot following an `event-driven` fashion.

> ** trigger context => callback() **

## Usage
Ensure yeoman is is installed:

`npm install -g yo` or `yarn global add yo`

After yeoman is installed:

`yo spark-bot`


## App Structure
```
.
├── commands                  # Event handlers are within the commands
│   └── example.js            # An example command for reference
├── app.js                    # Bot entry point
├── config.js                 # Configurations
├── test.js                   # AVA Test
├── readme.md
├── license
└── package.json
```

## Commands
Commands will instruct the bot on when and how to respond to particular contextual triggers.

To add a command, simply add a js file within the commands directory. When the bot is initializing, commands will automatically register with Flint at run-time.

These command must implement an interface that contains a `trigger` property and a `callback` method. Refer to `example.js` within the commands directory.

### trigger | [`<RegEx>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The contextual trigger that will cause the bot to execute the callback upon matches.

### callback | [`<function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

The function to be executed (event handler).

> A command sub-generator [yo spark-bot:command] is soon to come

## Scripts

- `npm run test` - Run linter and unit test
- `npm start` - Start the bot
- `npm run debug` - Activate debugging to log

## Unit Testing
Unit testing is straightforward, and simple. It's already configured with AVA. Commands are also accessible in the `commands` object. Any command callbacks can be tested as such: `commands.fileName.callback`.

In addition, the `rewire` module is pre-configured to test private methods and is easily accessible without the need of exporting any private methods. This is done with the `__get__()` method. IE: `commands.example.__get__('buildExampleMessage')`.

## Tech Dependencies
#### Test Runner
- [AVA](https://github.com/avajs/ava) - 🚀 Futuristic JavaScript test runner

#### Linter
- [XO](https://github.com/sindresorhus/xo) - JavaScript happiness style linter

#### Framework
- [Express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.
- [Flint](https://github.com/flint-bot/flint) - Cisco Spark Bot SDK for Node JS

## License
MIT © [Brandon Him](https://github.com/brh55/generator-spark-bot)
