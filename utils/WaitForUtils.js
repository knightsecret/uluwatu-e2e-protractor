/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */

'use strict';

var WaitForUtils = function () {};

WaitForUtils.prototype = Object.create({}, {
    isWarningDisplayed:                { value: function (expectedVisibility)  {
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
    waitForClusterStart:               { value: function ()  {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        var runningLed = element(by.css('div.mod-LED>span.state5-run'));
        var clusterISRunning = EC.visibilityOf(runningLed);
        var clusterISFailed = EC.visibilityOf(element(by.css('div.mod-LED>span.state3-stop')));

        var notifications = ['Creating infrastructure', 'collection finished', 'cluster services', 'Starting Ambari cluster...', 'Building Ambari', 'cluster built'];
        var messages = ['The stack creation has NOT started!', 'Metadata collection has NOT finished!', 'Ambari services has NOT started!', 'Ambari cluster has NOT started!', 'Ambari building has NOT started!', 'Ambari building has NOT finished!'];

        notifications.every(function(notification, index) {
            var expectedElement = element(by.css('input#notification-n-filtering[value*="' + notification + '"]'));

            browser.driver.wait(EC.visibilityOf(expectedElement), 20 * 60000, messages[index]).then(function() {
                return expectedElement.isDisplayed().then(function(isDisplayed) {
                    notificationBar.getAttribute('value').then(function(message){
                        console.log(message);
                    });
                    return isDisplayed;
                }, function(err) {
                    console.log('Expected state notification is not present!');
                    notificationBar.getAttribute('value').then(function(message){
                        console.log(message);
                    });
                    return false;
                });
            });
        });

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
    waitForClusterRemove:        { value: function ()  {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        var successfullyTerminated = element(by.css('input#notification-n-filtering[value*="successfully been terminated"]'));

        var notifications = ['Terminating the cluster'];
        var messages = ['The cluster termination has NOT started!'];

        notifications.every(function(notification, index) {
            var expectedElement = element(by.css('input#notification-n-filtering[value*="' + notification + '"]'));

            browser.driver.wait(EC.visibilityOf(expectedElement), 20 * 60000, messages[index]).then(function() {
                return expectedElement.isDisplayed().then(function(isDisplayed) {
                    notificationBar.getAttribute('value').then(function(message){
                        console.log(message);
                    });
                    return isDisplayed;
                }, function(err) {
                    console.log('Expected state notification is not present!');
                    notificationBar.getAttribute('value').then(function(message){
                        console.log(message);
                    });
                    return false;
                });
            });
        });

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