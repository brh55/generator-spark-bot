'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const yosay = require('yosay');
const _s = require('underscore.string');

module.exports = class extends Generator {
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
			validate: x => x.length > 0 ? true : 'You have to provide a token'
		},
		{
			name: 'port',
			message: 'What port do you want to run on?',
			default: 5000,
			validate: x => parseInt(x, 10) > 0 && parseInt(x, 10) < 65536 ? true : 'You have to provide a valid port number'
		},
		{
			name: 'redis',
			message: 'Do you want to activate Redis for storage?',
			default: false,
			type: 'confirm'
		},
		{
			name: 'heroku',
			message: 'Do you want to have a heroku quick deploy?',
			default: false,
			type: 'confirm'
		}])
		.then(props => {
			const copy = (from, to, tpl) => {
				const tplParam = tpl || {};
				this.fs.copyTpl(from, to, tplParam);
			};

			const copyOrphan = (from, to, tpl) => {
				// Not ideal to be using private method
				// but this avoids issue with globby recogonizing destPath/file
				// as file and file/**
				const tplParam = tpl || {};
				copy(this.templatePath(from), this.destinationPath(to), tplParam);
			};

			const tpl = Object.assign({}, props);
			tpl.website = humanizeUrl(props.website);
			tpl.name = this.user.git.name();
			tpl.email = this.user.git.email();

			copy([
				`${this.templatePath()}/**`,
				`!${this.templatePath()}/_*`,
				`!${this.templatePath()}/service/_*`
			], this.destinationPath(), tpl);

			if (props.heroku) {
				copy(
					this.templatePath('_app.json'),
					this.destinationPath('app.json'),
					tpl
				);
			}

			if (props.redis) {
				copy(
					this.templatePath('/service/_storage.js'),
					this.destinationPath('/service/storage.js'),
					tpl
				);
			}

			copyOrphan('_package.json', 'package.json', tpl);
			copyOrphan('_gitignore', '.gitignore');
			copyOrphan('_travis.yml', '.travis.yml');
			copyOrphan('_env', '.env', tpl);
			copyOrphan('_editorconfig', '.editorconfig');
		});
	}

	install() {
		this.installDependencies({ bower: false });
	}
};
