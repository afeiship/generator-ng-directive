'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('underscore');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the geometric ' + chalk.red('generator-ng-directive') + ' generator!'
    ));
    var prompts = [{
      type: 'input',
      name: 'module_name',
      message: 'Your module name?',
      default: path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'description',
      message: 'Your description?'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this._rewriteProps();
    this._writingJsMan();
    this._writingJsDirectiveTemplate();
    this._writingSassTemplate();
    this._writingLicense();
    this._writingGulp();
    this._writingPackageJson();
    this._writingReadme();
    this._writingEditorConfig();
    this._writingGitIgnore();
    this._writingBowerJson();
  },
  _writingJsMan: function () {
    this.fs.copy(
      this.templatePath('./src/angular/main.js'),
      this.destinationPath('./src/angular/main.js')
    );
  },
  _writingJsDirectiveTemplate: function () {
    this.fs.copyTpl(
      this.templatePath('./src/angular/directive/template.js'),
      this.destinationPath('./src/angular/directive/' + this._module_name + '.js'),
      this.props
    );
  },
  _writingSassTemplate: function () {
    this.fs.copyTpl(
      this.templatePath('./src/sass/template.scss'),
      this.destinationPath('./src/sass/' + this._module_name + '.scss'),
      this.props
    );
  },
  _writingLicense: function () {
    this.fs.copy(
      this.templatePath('LICENSE.txt'),
      this.destinationPath('LICENSE.txt')
    );
  },
  _writingGulp: function () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  },
  _writingPackageJson: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  },
  _writingReadme: function () {
    this.fs.copyTpl(
      this.templatePath('README.MD'),
      this.destinationPath('README.MD'),
      this.props
    );
  },
  _writingEditorConfig: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },
  _writingGitIgnore: function () {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  },
  _writingBowerJson: function () {
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props
    );
  },
  _rewriteProps: function () {
    var props = this.props;
    this._module_name = props['module_name'];
    _.each(props, function (prop, key) {
      this.props[this._nxCamelCase(key)] = this._nxCamelCase(prop);
    }, this);
  },
  _nxCamelCase: function (inString) {
    var string = 'nx-' + inString;
    return string.replace(/[_-]\D/g, function (match) {
      return match.charAt(1).toUpperCase();
    });
  },
  install: function () {
    //this.installDependencies();
    console.log('Running npm install & bower install for you to install the required dependencies. If this fails, try running the command yourself.');
  },
  end: function () {
    this.log('Well done! Start your work! :)');
  }
});
