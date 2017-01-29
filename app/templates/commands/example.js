'use strict';

module.exports = {
	trigger: 'example',
	callback: example
};

function example(bot, trigger) {
	bot.say(buildExampleMessage(trigger));
}

function buildExampleMessage(trigger) {
	return `I heard "${trigger}", so I wanted to say hi!`;
}
