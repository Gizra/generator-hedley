'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var ncp = require('ncp').ncp;
var process = require('process');
var replace = require('replace');
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
      // @todo: Use a function to get the "static" folder.
      var source = this.templatePath('../static');
      var destination = this.destinationPath();

      ncp(source, destination, function(err) {
        if (err) {
          return self.log(err);
        }
        self.log('Static files copied');


        // @todo: Rename all "skeleton" folder and files to the project name.
        glob(self.destinationPath() + '/**/skeleton*', function(err, files) {
          var processed = 0;
          self.log('Renaming following files:');
          self.log(files);
          files.forEach(function(file) {
            var dir = path.dirname(file);
            var filename = path.basename(file);
            fs.renameSync(file, dir + '/' + filename.replace('skeleton', self.projectName));
            processed++;
          });
        });

        //replace({
        //  regex: "skeleton",
        //  replacement: self.projectName,
        //  paths: [self.destinationPath() + '/drupal'],
        //  recursive: true,
        //  silent: false
        //});
        //
        //replace({
        //  regex: 'drupal',
        //  replacement: self.projectName,
        //  paths: [self.destinationPath()],
        //  recursive: false,
        //  silent: false
        //});
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
