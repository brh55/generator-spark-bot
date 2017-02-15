'use strict';

module.exports = {
	trigger: '<%= triggerPhrase %>',
	callback: <%= commandName %>,
};

function <%= commandName %>(bot, trigger) {
	bot.say('Hey I heard "<%= triggerPhrase %>", so I just wanted to say hi!');
}
