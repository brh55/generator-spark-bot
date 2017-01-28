'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const yosay = require('yosay');
const _s = require('underscore.string');

module.exports = class extends Generator {
	constructor(a, b) {
		super(a, b);
	}

	init() {
		this.log(yosay(
			`Welcome to ${chalk.red('generator-')}${chalk.blue('spark')}${chalk.red('-bot')} generator!`
		));

		return this.prompt([{
			name: 'botName',
			type: 'input',
			message: 'What do you want to name your Cisco spark bot?',
			default: _s.slugify(this.appname),
			filter: x => _s.slugify(x)
		}, {
			name: 'botDescription',
			type: 'input',
			message: 'What is your bot description?',
			default: `My awesome spark bot!`
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a website URL',
			filter: x => normalizeUrl(x)
		},
		{
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a username',
			when: () => !this.options.org
		},
		{
			name: 'webhookUrl',
			message: 'What is your webhook url for your bot?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a valid webhook url',
			filter: x => normalizeUrl(x, {normalizeHttps: true}).slice(0, 4) + 's' + normalizeUrl(x, {normalizeHttps: true}).slice(4)
		}, {
			name: 'token',
			message: 'What is your bot token?',
			validate: x => x.length > 0 ? true : 'You have to provide a token',
		},
		{
			name: 'port',
			message: 'What port do you want to run on?',
			default: 5000,
			validate: x => parseInt(x) > 0 && parseInt(x) < 65536 ? true : 'You have to provide a valid port number',
		},
		{
			name: 'heroku',
			message: 'Do you want to have a heroku quick deploy?',
			default: false,
			type: 'confirm'
		}]).then(props => {
			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			const tpl = Object.assign({}, props);
			tpl.website = humanizeUrl(props.website);
			tpl.name = this.user.git.name();
			tpl.email = this.user.git.email();

			this.fs.copyTpl([
				`${this.templatePath()}/**`,
				'!**/_app.json'
			], this.destinationPath(), tpl);

			if (props.heroku) {
				this.fs.copyTpl(this.templatePath('_app.json'), this.destinationPath('app.json'), tpl);
			}

			mv('gitignore', '.gitignore');
			mv('travis.yml', '.travis.yml');
			mv('_package.json', 'package.json');
			mv('env', '.env');
			mv('editorconfig', '.editorconfig');
		});
	}

	install() {
		this.installDependencies();
	}
}
