'use strict';
const Generator = require('yeoman-generator');
const superb = require('superb');
const _s = require('underscore.string');

module.exports = class extends Generator {
	init() {
		return this.prompt([{
			name: 'commandName',
			type: 'input',
			message: 'What do you want to name command?',
			default: _s.slugify(`${superb()}`),
			filter: x => _s.slugify(x)
		}, {
			name: 'triggerPhrase',
			type: 'input',
			message: 'What is the trigger (/regex/ or string)?',
			default: `you are ${superb()}!`
		}])
		.then(props => {
			const copy = (from, to, tpl) => {
				const tplParam = tpl || {};
				this.fs.copyTpl(from, to, tplParam);
			};

			copy(`${this.templatePath()}/command.js`, `${this.destinationPath()}/commands/${props.commandName}.js`, props);
		});
	}
};
