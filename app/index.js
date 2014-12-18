'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var ncp = require('ncp').ncp;
var process = require('process');

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
      message: 'What is the project name?',
      default: 'headless-drupal7'
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
    containers: function() {
      this.mkdir(this.projectName);
    },
    app: function () {
      var directory = this.projectName + '/client/';
      this.mkdir(directory);
      this.fs.copy(
        this.templatePath('client/_package.json'),
        this.destinationPath(directory + 'package.json')
      );
      this.fs.copy(
        this.templatePath('client/_bower.json'),
        this.destinationPath(directory + 'bower.json')
      );
    },

    appStatic: function () {
      var self = this;
      // @todo: Use a function to get the "static" folder.
      var source = this.templatePath('../static');
      var destination = this.projectName;
      var options = {
        // Don't overwrite existing files.
        clobber: false
      };

      ncp(source, destination, options, function(err) {
        if (err) {
          return self.log(err);
        }
        self.log('Copy done!');
      });
    }
  },

  /**
   * Install bower/ npm on the "client" directory.
   */
  install: function () {
    var self = this;
    process.chdir(this.projectName + '/client');
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function() {
        // Change path back to the root.
        process.chdir('../../');
      }
    });
  }
});
