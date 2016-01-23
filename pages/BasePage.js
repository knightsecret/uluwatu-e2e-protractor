'use strict';
var ClusterModule = require('../modules/ClusterModule.js');
var WidgetModule = require('../modules/WidgetModule.js');

var BasePage = function () {
    browser.get('https://pre-prod-cloudbreak.sequenceiq.com/');
};

BasePage.prototype  = Object.create({}, {
  navBar:               {   get: function ()  { return element(by.css('div#navbar-collapse-1'));                          }},
  clusterBar:           {   get: function ()  { return element(by.css('div#clusters-bar'));                               }},
  dashboardLink:        {   get: function ()  { return this.navBar.element(by.cssContainingText('a', 'dashboard'));       }},
  accountLink:          {   get: function ()  { return this.navBar.element(by.cssContainingText('a', 'account'));         }},
  credentialList:       {   get: function ()  { return this.navBar.element(by.css('li#menu-credential'));                 }},
  credentials:          {   get: function ()  { return element.all(by.repeater('credential in $root.credentials'));       }},
  createClusterButton:  {   get: function ()  { return this.clusterBar.element(by.css('button#create-cluster-btn'));      }},

  selectCredentialByName:                     { value: function (name)  {
    this.credentialList.click().then(function() {
      return browser.element(by.cssContainingText('li>a', name)).click().then(function () {
        browser.waitForAngular();
        return browser.wait(function() {
          return browser.element(by.cssContainingText('li>a>span', name)).isDisplayed();
        }, 20000)
      });
    });
    this.credentials.filter(function(credential) {
      credential.element(by.cssContainingText('li>a', name)).then(function (credentialLink) {
        credentialLink.click().then(function () {
          browser.waitForAngular();
          return browser.wait(function () {
            return browser.element(by.css('li#menu-credential>a>span')).getText(function(text) {
              return text === name;
            });
          }, 20000);
        });
      });
    });
  }},
  getSelectedCredential:                      { value: function ()  {
    return this.credentialList.element(by.css('a>span.ng-binding.text')).getText();
  }},
  openClusterCreate:                          { value: function ()  {
    this.createClusterButton.click().then(function() {
      return browser.wait(function () {
        return browser.element(by.css('div#cluster-form-panel')).isDisplayed();
      }, 20000);
    });
  }},
  getClusterState:                            { value: function ()  {
    browser.waitForAngular();
    return browser.element(by.css('input#notification-n-filtering')).getAttribute('value').then(function(value) {
      console.log(value);
    });
  }},
  createNewAWSCluster:                        { value: function (name, region, network, securityGroup, blueprint)  {
      var clusterModule = new ClusterModule();
      this.openClusterCreate();
      clusterModule.createNewAWSCluster(name, region, network, securityGroup, blueprint);
      var widgetModule = new WidgetModule();
      return widgetModule.isClusterPresent(name);
  }},
  openClusterDetails:                         { value: function (name)  {
      var widgetModule = new WidgetModule();
      return widgetModule.openCluster(name);
  }},
  isClusterStarted:                              { value: function (name)  {
      var widgetModule = new WidgetModule();
      return widgetModule.getClusterStarted(name);
  }},
  terminateCluster:                          { value: function (name)  {
      var widgetModule = new WidgetModule();
      widgetModule.openCluster(name);

      var clusterModule = new ClusterModule();
      clusterModule.clickTerminateButton();
      clusterModule.clickConfirmTerminateButton();

      return widgetModule.isClusterTerminated(name);
  }}
});
module.exports = BasePage;