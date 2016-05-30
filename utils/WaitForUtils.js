/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */

'use strict';

var WaitForUtils = function () {};

WaitForUtils.prototype = Object.create({}, {

    isWarningDisplayed:                      { value: function (expectedVisibility)  {
        return browser.driver.wait(function () {
            if (expectedVisibility) {
                return element(by.css('.warning')).isDisplayed().then(function(visibility) {
                    return visibility === expectedVisibility;
                });
            } else {
                return element.all(by.css('.warning .collapse.in')).then(function(items) {
                    return items.length === 0;
                });
            }
        }, 20000).then(function() {
            return element.all(by.css('.warning .collapse.in'));
        }).then(function (items) {
            return items.length > 0;
        });
    }},
    waitForNotification:                      { value: function (expectedElement, message)  {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        browser.driver.wait(EC.visibilityOf(expectedElement), 30 * 60000, message).then(function() {
            return expectedElement.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            }, function(err) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return false;
            });
        });
    }},
    waitForClusterStart:                      { value: function ()  {
        var EC = protractor.ExpectedConditions;

        var runningLed = element(by.css('div.mod-LED>span.state5-run'));
        var clusterISRunning = EC.visibilityOf(runningLed);
        var clusterISFailed = EC.visibilityOf(element(by.css('div.mod-LED>span.state3-stop')));

        var creatingInfrastructure = element(by.css('input#notification-n-filtering[value*="Creating infrastructure"]'));
        var metadataCollection = element(by.css('input#notification-n-filtering[value*="collection finished"]'));
        var startingAmbariClusterServices = element(by.css('input#notification-n-filtering[value*="cluster services"]'));
        var startingAmbari = element(by.css('input#notification-n-filtering[value*="Starting Ambari cluster..."]'));
        var buildingAmbari = element(by.css('input#notification-n-filtering[value*="Building Ambari"]'));
        var builtAmbari = element(by.css('input#notification-n-filtering[value*="cluster built"]'));

        this.waitForNotification(creatingInfrastructure, 'The stack creation has NOT started!');
        this.waitForNotification(metadataCollection, 'Metadata collection has NOT finished!');
        this.waitForNotification(startingAmbariClusterServices, 'Ambari services has NOT started!');
        this.waitForNotification(startingAmbari, 'Ambari cluster has NOT started!');
        this.waitForNotification(buildingAmbari, 'Ambari building has NOT started!');
        this.waitForNotification(builtAmbari, 'Ambari building has NOT finished!');

        return browser.driver.wait(EC.or(clusterISRunning, clusterISFailed), 30 * 60000, 'The cluster is NOT visible!').then(function() {
            return runningLed.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The cluster has NOT created!');
            return err;
        });
    }},
    waitForClusterRemove:                      { value: function ()  {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        var terminatingCluster = element(by.css('input#notification-n-filtering[value*="Terminating the cluster"]'));
        var successfullyTerminated = element(by.css('input#notification-n-filtering[value*="successfully been terminated"]'));

        this.waitForNotification(terminatingCluster, 'The cluster termination has NOT started!');

        return browser.driver.wait(EC.visibilityOf(successfullyTerminated), 30 * 60000, 'The cluster has NOT been terminated!').then(function() {
            return successfullyTerminated.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            }, function(err) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return false;
            });
        }, function(err) {
            console.log('The notification has not generated!');
            return err;
        });
    }}
});
module.exports = WaitForUtils;