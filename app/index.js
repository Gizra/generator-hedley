'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var process = require('process');
var fs = require('fs');
var glob = require('glob');

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
      default: 'headless_drupal7'
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
      message: 'What is the GitHub repo URL?',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.githubRepo = props.githubRepo;

      done();
    }.bind(this));
  },


  writing: {
    appStatic: function() {
      var self = this;
      var source = this.templatePath();
      var destination = this.destinationPath();

      glob(self.templatePath() + '/**/*', function(err, files) {
        self.log(files);
        files.forEach(function(file) {
          self.log('Processing file:');
          self.log(file);

          var dir = path.dirname(file).replace('skeleton', self.projectName);
          var filename = path.basename(file).replace('skeleton', self.projectName);

          self.fs.copy(
            self.templatePath(file),
            self.destinationPath(destination + '/' + dir + '/' + filename)
          );
        });
      });
    }
  },

  install: {

    /**
     * Install Behat.
     */
    behat: function() {
      var options = {
        cwd: './behat'
      };

      // this.spawnCommand('composer', ['install'], options);
    },

    /**
     * Install bower/ npm on the "client" directory.
     */
    client: function() {
      var options = {
        cwd: './client'
      };

      this.log('bower install');
      // this.bowerInstall(null, options);

      this.log('npm install');
      // this.npmInstall(null, options);
    },

    drupal: function() {
    }
  }


});
