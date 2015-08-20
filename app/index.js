'use strict';
var yeoman = require('yeoman-generator');
var changeCase = require('change-case');
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

  addOptions: function() {
    // Try to get value from the CLI.
    this.option('project-name', {
      desc: 'The project name',
      type: String,
      required: 'false'
    });

    this.option('github-repo', {
      desc: 'the GitHub repository URL',
      type: String,
      required: 'false'
    });

    this.option('drupal-url', {
      desc: 'The local Drupal URL',
      type: String,
      required: 'false'
    });

    this.option('drupal-url', {
      desc: 'The local Drupal URL',
      type: String,
      required: 'false'
    });

    this.option('db', {
      desc: 'The database name',
      type: String,
      required: 'false'
    });

    this.option('db-user', {
      desc: 'The database user name',
      type: String,
      required: 'false'
    });

    this.option('db-pass', {
      desc: 'The database user name',
      type: String,
      required: 'false'
    });

    this.option('pusher-key', {
      desc: 'The pusher key',
      type: String,
      required: 'false'
    });

    this.option('pusher-secret', {
      desc: 'The pusher secret',
      type: String,
      required: 'false'
    });

    this.option('pusher-id', {
      desc: 'The pusher app ID',
      type: String,
      required: 'false'
    });
  },

  askForProjectName: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hedley') + ' generator!'
    ));

    if (this.options['project-name']) {
      // Get the value from the CLI.
      this.projectName = this.options['project-name'];
      this.log('Setting project name to: ' + this.projectName);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'projectName',
      message: 'What is the project machine name?',
      default: 'skeleton'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  askForGithubRepo: function () {
    if (this.options['github-repo']) {
      // Get the value from the CLI.
      this.githubRepo = this.options['github-repo'];
      this.log('Setting GitHub repository to: ' + this.githubRepo);
      return;
    }

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

  askForDrupallUrl: function () {
    if (this.options['drupal-url']) {
      // Get the value from the CLI.
      this.drupalUrl = this.options['drupal-url'];
      this.log('Setting Drupal URL to: ' + this.drupalUrl);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'drupalUrl',
      message: 'What is the local Drupal URL?',
      default: 'http://localhost/' + this.projectName + '/www'
    }];

    this.prompt(prompts, function (props) {
      this.drupalUrl = props.drupalUrl;

      done();
    }.bind(this));
  },

  askForDbName: function () {
    if (this.options['db']) {
      // Get the value from the CLI.
      this.dbName = this.options['db'];
      this.log('Setting database name to: ' + this.dbName);
      return;
    }

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
    if (this.options['db-user']) {
      // Get the value from the CLI.
      this.dbUser = this.options['db-user'];
      this.log('Setting database user name to: ' + this.dbUser);
      return;
    }

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
    // Allow passing an empty password.
    if (this.options['db-pass'] !== undefined) {
      // Get the value from the CLI.
      this.dbPass = this.options['db-pass'];
      this.log('Setting database user password to: ' + this.dbPass);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'dbPass',
      message: 'What is the Database password?',
      // Empty by default, as otherwise it might not be able to set to blank.
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.dbPass = props.dbPass;

      done();
    }.bind(this));
  },

  askForPusherKey: function () {
    // Allow passing an empty password.
    if (this.options['pusher-key'] !== undefined) {
      // Get the value from the CLI.
      this.pusherKey = this.options['pusher-key'];
      this.log('Setting pusher key: ' + this.pusherKey);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'pusherKey',
      message: 'What is the Pusher key?',
      // Empty by default, as otherwise it might not be able to set to blank.
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.pusherKey = props.pusherKey;

      done();
    }.bind(this));
  },

  askForPusherSecret: function () {
    // Allow passing an empty password.
    if (this.options['pusher-secret'] !== undefined) {
      // Get the value from the CLI.
      this.pusherSecret = this.options['pusher-secret'];
      this.log('Setting pusher secret: ' + this.pusherSecret);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'pusherSecret',
      message: 'What is the Pusher Secret?',
      // Empty by default, as otherwise it might not be able to set to blank.
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.pusherSecret = props.pusherSecret;

      done();
    }.bind(this));
  },

  askForPusherId: function () {
    // Allow passing an empty password.
    if (this.options['pusher-id'] !== undefined) {
      // Get the value from the CLI.
      this.pusherId = this.options['pusher-id'];
      this.log('Setting pusher app ID: ' + this.pusherId);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'pusherId',
      message: 'What is the Pusher App ID?',
      // Empty by default, as otherwise it might not be able to set to blank.
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.pusherId = props.pusherId;

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
          .replace(/Skeleton/g, changeCase.pascalCase(self.projectName));


        var dir = path.dirname(newFileName);
        var baseName = path.basename(newFileName);
        var extension = path.extname(baseName);

        if (extension !== '.scss') {
          // If not a SCSS file, convert the prefix of the underscore to a dot.
          baseName = baseName.replace(/^_/g, '.');
        }

        newFileName = dir ? dir + '/' + baseName : baseName;

        if (extension === '.png' || extension === '.jpg') {
          self.fs.copy(self.templatePath(fileName), self.destinationPath(newFileName));
        }
        else {
          // Not an image.
          var repoName = self.githubRepo.replace('https://github.com/', '');

          var contents = self.fs.read(self.templatePath(fileName));
          var newContents = contents
            .replace(/skeleton/g, self.projectName)
            .replace(/Skeleton/g, changeCase.pascalCase(self.projectName))
            .replace(/"BASE_DOMAIN_URL"/g, '"' + self.drupalUrl + '"')
            .replace(/repoName/g, repoName);

          if (fileName === 'config.sh') {
            newContents = newContents
              .replace(/MYSQL_USERNAME=".*"/g, 'MYSQL_USERNAME="' + self.dbUser + '"')
              .replace(/MYSQL_PASSWORD=".*"/g, 'MYSQL_PASSWORD="' + self.dbPass + '"')
              .replace(/<your-app-key>/g, self.pusherKey)
              .replace(/<your-app-secret>/g, self.pusherSecret)
              .replace(/<your-app-id>/g, self.pusherId);
          }

          self.fs.write(newFileName, newContents);
        }

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

      this.log('npm install (angular)');
      this.npmInstall(null, {cwd: 'client'});

      this.log('npm install (phantomcss)');
      this.npmInstall(null, {cwd: 'phantomcss'});

      this.log('Composer install');
      this.spawnCommand('composer', ['install'], {cwd: './behat'});

      this.log('Drupal install');
      this.spawnCommand('bash', ['install', '-dly']);
    }
  }
});
