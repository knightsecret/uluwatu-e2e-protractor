'use strict';
var ClusterModule = require('../modules/ClusterModule.js');
var WidgetModule = require('../modules/WidgetModule.js');
var WaitForUtils = require('../utils/WaitForUtils.js');

var BasePage = function () {
    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            //console.log(url);
            return /#/g.test(url);
        });
    }, 2000)
};

BasePage.prototype  = Object.create({}, {
  navBar:               {   get: function ()  { return element(by.css('div#navbar-collapse-1'));                          }},
  clusterBar:           {   get: function ()  { return element(by.css('div#clusters-bar'));                               }},
  dashboardLink:        {   get: function ()  { return this.navBar.element(by.cssContainingText('a', 'dashboard'));       }},
  accountLink:          {   get: function ()  { return this.navBar.element(by.cssContainingText('a', 'account'));         }},
  credentialList:       {   get: function ()  { return this.navBar.element(by.css('li#menu-credential'));                 }},
  credentials:          {   get: function ()  { return element.all(by.repeater('credential in $root.credentials'));       }},
  createClusterButton:  {   get: function ()  { return this.clusterBar.element(by.css('button#create-cluster-btn'));      }},
  notificationBar:      {   get: function ()  { return this.clusterBar.element(by.css('input#notification-n-filtering')); }},

  selectCredentialByName:                     { value: function (name)  {
    var EC = protractor.ExpectedConditions;
    var button = this.credentialList.element(by.partialLinkText('select a credential'));
    var isClickable = EC.elementToBeClickable(button);
    browser.wait(isClickable, 10000);

    this.credentialList.element(by.partialLinkText('select a credential')).click().then(function() {
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
  pushNotification:                           { value: function ()  {
    this.notificationBar.getAttribute('value').then(function(message){
        console.log(message + ' from BasePage');
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
  isClusterStarted:                           { value: function (name)  {
      var widgetModule = new WidgetModule();
      return widgetModule.isClusterStarted(name);
  }},
  isClusterRun:                               { value: function ()  {
     var waitForUtils = new WaitForUtils();
     return waitForUtils.waitForClusterStart();
  }},
  terminateCluster:                           { value: function (name)  {
      var widgetModule = new WidgetModule();
      widgetModule.openCluster(name);

      var clusterModule = new ClusterModule();
      clusterModule.clickTerminateButton();
      clusterModule.clickConfirmTerminateButton();
      return widgetModule.isClusterTerminated();
  }},
  isClusterRemoved:                           { value: function ()  {
      var waitForUtils = new WaitForUtils();
      return waitForUtils.waitForClusterRemove();
  }}
});
module.exports = BasePage;