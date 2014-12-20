'use strict';
var yeoman = require('yeoman-generator');
var camelCase = require('camelcase');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var process = require('process');
var fs = require('fs-extra');
var glob = require('glob');
var replace = require('replace');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  askForProjectName: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hedley') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the project machine name?',
      default: 'hedley'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  askForGithubRepo: function () {
    var done = this.async();

    var prompts = [{
      name: 'githubRepo',
      message: 'What is the GitHub repository URL?',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.githubRepo = props.githubRepo;

      done();
    }.bind(this));
  },

  askForRepoPublic: function () {
    if (!this.githubRepo) {
      return;
    }
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'repoPublic',
      message: 'Is the GitHub repository public (so we can set your Travis link correcrly)?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.repoPublic = props.repoPublic;

      done();
    }.bind(this));
  },

  askForLocalUrl: function () {
    var done = this.async();

    var prompts = [{
      name: 'localUrl',
      message: 'What is the local URL?',
      default: 'http://localhost/' + this.projectName + '/www'
    }];

    this.prompt(prompts, function (props) {
      this.localUrl = props.localUrl;

      done();
    }.bind(this));
  },

  askForDbName: function () {
    var done = this.async();

    var prompts = [{
      name: 'dbName',
      message: 'What is the Database name?',
      default: this.projectName
    }];

    this.prompt(prompts, function (props) {
      this.dbName = props.dbName;

      done();
    }.bind(this));
  },

  askForDbUser: function () {
    var done = this.async();

    var prompts = [{
      name: 'dbUser',
      message: 'What is the Database user?',
      default: 'root'
    }];

    this.prompt(prompts, function (props) {
      this.dbUser = props.dbUser;

      done();
    }.bind(this));
  },

  askForDbPass: function () {
    var done = this.async();

    var prompts = [{
      name: 'dbPass',
      message: 'What is the Database password?',
      default: 'root'
    }];

    this.prompt(prompts, function (props) {
      this.dbPass = props.dbPass;

      done();
    }.bind(this));
  },


  writing: {
    app: function() {
      var self = this;
      var files = glob.sync(self.templatePath() + '/**/*');

      files.forEach(function(file) {
        if (fs.lstatSync(file).isDirectory()) {
          // Don't try to copy a directory.
          return;
        }

        var fileName = file.replace(self.templatePath('/'), '');
        var newFileName = fileName
          .replace(/skeleton/g, self.projectName)
          .replace(/Skeleton/g, camelCase(self.projectName));


        var dir = path.dirname(newFileName);
        var baseName = path.basename(newFileName).replace(/^_/g, '.');

        newFileName = dir ? dir + '/' + baseName : baseName;

        var contents = self.fs.read(self.templatePath(fileName));
        var newContents = contents
          .replace(/skeleton/g, self.projectName)
          .replace(/Skeleton/g, camelCase(self.projectName));

        self.fs.write(newFileName, newContents);
      });
    }
  },

  install: {

    /**
     * Install bower/ npm on the "client" directory.
     */
    client: function() {
      if (this.options['skip-install']) {
        // @todo: Improve message.
        this.log('Skip install');
        return;
      }

      this.log('bower install');
      this.bowerInstall(null, {cwd: 'client'});

      this.log('npm install');
      this.npmInstall(null, {cwd: 'client'});

      this.log('Composer install');
      this.spawnCommand('composer', ['install'], {cwd: './behat'});

      this.log('Drupal install');
      this.spawnCommand('bash', ['install', '-dly']);
    }
  }
});
