'use strict';
var CredentialModule = require('../modules/CredentialModule.js');
var BlueprintModule = require('../modules/BlueprintModule.js');

var DashboardPage = function () {
  browser.waitForAngular();
  browser.driver.wait(function() {
    return browser.driver.getCurrentUrl().then(function(url) {
      //console.log(url);
      return /#/g.test(url);
    });
  }, 2000)
};

DashboardPage.prototype  = Object.create({}, {
  blueprintsexpandButton:  { get: function ()  { return element(by.css('a#blueprints-btn'));   }},
  credentialsexpandButton: { get: function ()  { return element(by.css('a#credentials-btn'));  }},

  expandBlueprints:        { value: function ()  {
    var EC = protractor.ExpectedConditions;
    var expandButton = this.blueprintsexpandButton;
    var expandedButton = browser.element(by.css('a#blueprints-btn[aria-expanded="true"]'));


    return browser.driver.wait(EC.visibilityOf(expandedButton), 2000,'Button has NOT expanded!').then(function() {
      //  console.log('Button has already expanded!');
    }, function(err) {
      //  console.log('Button has NOT expanded!');
      return browser.driver.actions().click(expandButton).perform().then(function() {
        return browser.driver.wait(function() {
          return expandedButton.isDisplayed();
        }, 2000, 'Cannot see this element!');
      });
    });
  }},
  expandCredentials:       { value: function ()  {
    var EC = protractor.ExpectedConditions;
    var expandButton = this.credentialsexpandButton;
    var expandedPanel = browser.element(by.css('.panel-collapse.panel-btn-in-header-collapse.collapse.in'));

    return browser.driver.wait(EC.visibilityOf(expandedPanel), 2000,'Manage Credentials has NOT expanded!').then(function() {
      //  console.log('Manage Credentials has already expanded!');
    }, function(err) {
      //  console.log('Manage Credentials has NOT expanded!');
      return browser.driver.actions().click(expandButton).perform().then(function() {
        browser.waitForAngular();
        return browser.driver.wait(function() {
          return expandedPanel.isDisplayed();
        }, 2000, 'Cannot see expanded Manage Credentials!');
      });
    });
  }},
  getBadgeValue:           { value: function (idx)  {
    return element.all(by.css('span.badge.pull-right.ng-binding')).get(idx).getText().then(function(value){
      return parseInt(value.trim(), 10);
    });
  }},
  deleteAWSCredential:     { value: function (name)  {
    this.expandCredentials();
    var credentialModule = new CredentialModule();
    return credentialModule.deleteAWSCredential(name);
  }},
  createAWSCredential:     { value: function (name, description, iamRole, sshKey)  {
    this.expandCredentials();
    var credentialModule = new CredentialModule();
    return credentialModule.createAWSCredential(name, description, iamRole, sshKey);
  }},
  getDefaultBlueprints:    { value: function ()  {
    this.expandBlueprints();
    var blueprintModule = new BlueprintModule();
    return blueprintModule.isDefaultBlueprintAvailable();
  }},
  deleteBlueprint:         { value: function (name)  {
    this.expandBlueprints();
    var blueprintModule = new BlueprintModule();
    return blueprintModule.deleteBlueprint(name);
  }},
  createBlueprint:         { value: function (name, description, url)  {
    this.expandBlueprints();
    var blueprintModule = new BlueprintModule();
    return blueprintModule.createBlueprint(name, description, url);
  }}
});

module.exports = DashboardPage;