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

    appStatic: function() {
      var self = this;
      // @todo: Use a function to get the "static" folder.
      var source = this.templatePath('../static');
      var destination = this.projectName + '/../';

      ncp(source, destination, function(err) {
        if (err) {
          return self.log(err);
        }
        self.log('Static files copied');
      });
    },

    app: function() {
      this.fs.copy(
        this.templatePath('client/_package.json'),
        this.destinationPath('client/package.json')
      );
      this.fs.copy(
        this.templatePath('client/_bower.json'),
        this.destinationPath('client/bower.json')
      );
    }
  },

  install: {

    /**
     * Install Behat.
     */
    behat: function() {
    },

    /**
     * Install bower/ npm on the "client" directory.
     */
    client: function() {
    },

    drupal: function() {
    }
  }


});
