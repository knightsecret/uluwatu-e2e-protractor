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
    var expandedButton = element(by.css('a#blueprints-btn[aria-expanded="true"]'));

    return browser.driver.wait(EC.stalenessOf(expandedButton), 2000,'Manage Blueprints has already expanded!').then(function() {
      return expandButton.click().then(function() {
        return browser.driver.wait(function() {
          return expandedButton.isDisplayed();
        }, 2000, 'Cannot see this element!');
      });
    }, function(err) {
      //console.log('Manage Blueprints have NOT expanded!');
    });
  }},
  expandCredentials:       { value: function ()  {
    var EC = protractor.ExpectedConditions;
    var expandButton = this.credentialsexpandButton;
    var expandedButton = element(by.css('a#credentials-btn[aria-expanded="true"]'));

    return browser.driver.wait(EC.stalenessOf(expandedButton), 2000,'Manage Credentials has already expanded!').then(function() {
      return expandButton.click().then(function() {
        return browser.driver.wait(function() {
          return expandedButton.isDisplayed();
        }, 2000, 'Cannot see this element!');
      });
    }, function(err) {
      //console.log('Manage Credentials has NOT expanded!');
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