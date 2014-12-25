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
  },

  askForProjectName: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hedley') + ' generator!'
    ));

    if (this.options['project-name']) {
      // Get the value from the CLI.
      this.projectName = this.options['project-name'];
      this.log('Setting project name to:' + this.projectName);
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
      this.log('Setting GitHub repository to:' + this.githubRepo);
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
      this.githubRepo = this.options['drupal-url'];
      this.log('Setting Drupal URL to:' + this.drupalUrl);
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
      this.githubRepo = this.options['db'];
      this.log('Setting database name to:' + this.dbName);
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
      this.githubRepo = this.options['db-user'];
      this.log('Setting database user name to:' + this.dbUser);
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
    if (this.options['db-pass']) {
      // Get the value from the CLI.
      this.githubRepo = this.options['db-pass'];
      this.log('Setting database user password to:' + this.dbPass);
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
          var contents = self.fs.read(self.templatePath(fileName));
          var newContents = contents
            .replace(/skeleton/g, self.projectName)
            .replace(/Skeleton/g, changeCase.pascalCase(self.projectName));

          if (fileName === 'config.sh') {
            newContents = newContents
              .replace(/MYSQL_USERNAME=".*"/g, 'MYSQL_USERNAME="' + self.dbUser + '"')
              .replace(/MYSQL_PASSWORD=".*"/g, 'MYSQL_PASSWORD="' + self.dbPass + '"')
              .replace(/BASE_DOMAIN_URL=".*"/g, 'BASE_DOMAIN_URL="' + self.drupalUrl + '"');
          }

          if (fileName === 'README.md') {
            var repoName = self.githubRepo.replace('https://github.com/', '');

            newContents = newContents
              .replace('repoName', repoName);
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

      this.log('npm install');
      this.npmInstall(null, {cwd: 'client'});

      this.log('Composer install');
      this.spawnCommand('composer', ['install'], {cwd: './behat'});

      this.log('Drupal install');
      this.spawnCommand('bash', ['install', '-dly']);
    }
  }
});
