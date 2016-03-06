'use strict';
var CredentialModule = require('../modules/CredentialModule.js');
var BlueprintModule = require('../modules/BlueprintModule.js');

var DashboardPage = function () {
  browser.get('https://pre-prod-cloudbreak.sequenceiq.com/');
};

DashboardPage.prototype  = Object.create({}, {
  blueprintsexpandButton:  {   get: function ()  { return element(by.css('a#blueprints-btn'));   }},
  credentialexpandButton:  {   get: function ()  { return element(by.css('a#credentials-btn'));  }},

  expandBlueprints:        { value: function ()  {
    return this.blueprintsexpandButton.click().then(function() {
      return browser.driver.wait(function () {
        return browser.element(by.css('a#panel-create-blueprints-collapse-btn')).isDisplayed();
      }, 20000);
    });
  }},
  expandCredentials:       { value: function ()  {
    return this.credentialexpandButton.click().then(function() {
      return browser.driver.wait(function () {
        return browser.element(by.css('a#panel-create-credentials-collapse-btn')).isDisplayed();
      }, 20000);
    });
  }},
  getBadgeValue:           { value: function (idx)  {
    return element.all(by.css('span.badge.pull-right.ng-binding')).get(idx).getText().then(function(value){
      return parseInt(value.trim(), 10);
    });
  }},
  createAWSCredential:     { value: function (name, description, iamRole, sshKey)  {
    var credentialModule = new CredentialModule();
    return credentialModule.createAWSCredential(name, description, iamRole, sshKey);
  }},
  createBlueprint:         { value: function (name, description, url)  {
     var blueprintModule = new BlueprintModule();
     return blueprintModule.createBlueprint(name, description, url);
  }}
});

module.exports = DashboardPage;