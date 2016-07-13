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
    checkingNotifications:             { value: function (notificationArray, errorMessagesArray)  {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        return notificationArray.every(function(notification, index) {
            var expectedElement = element(by.css('input#notification-n-filtering[value*="' + notification + '"]'));

            return browser.driver.wait(EC.visibilityOf(expectedElement), 60 * 20000, errorMessagesArray[index]).then(function() {
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
    }},
    waitForClusterInstall:             { value: function ()  {
        var EC = protractor.ExpectedConditions;

        var runningLed = element(by.css('div.mod-LED>span.state5-run'));
        var stoppedLed = element(by.css('div.mod-LED>span.state3-stop'));
        var clusterISRunning = EC.visibilityOf(runningLed);
        var clusterISFailed = EC.visibilityOf(stoppedLed);

        var notifications = ['Creating infrastructure', 'Infrastructure metadata collection finished', 'Bootstrapping infrastructure cluster', 'Starting Ambari cluster services', 'Building Ambari cluster; Ambari ip', 'Ambari cluster built; Ambari ip'];
        var messages = ['The stack creation has NOT started!', 'Metadata collection has NOT finished!', 'Infrastructure bootstrapping has NOT started!', 'Ambari cluster services has NOT started!', 'Ambari cluster building has NOT started!', 'Ambari building has NOT finished!'];

        this.checkingNotifications(notifications, messages);

        return browser.driver.wait(EC.or(clusterISRunning, clusterISFailed), 20000, 'The cluster has NOT been installed!').then(function() {
            return runningLed.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has NOT generated!');
            return err;
        });
    }},
    waitForClusterRemove:        { value: function ()  {
        var EC = protractor.ExpectedConditions;

        var successfullyTerminated = element(by.css('input#notification-n-filtering[value*="successfully been terminated"]'));

        var notifications = ['Terminating the cluster', 'successfully been terminated'];
        var messages = ['The cluster termination has NOT started!', 'The cluster has not been terminated!'];

        this.checkingNotifications(notifications, messages);

        return browser.driver.wait(EC.visibilityOf(successfullyTerminated), 20000, 'The cluster has NOT been terminated!').then(function() {
            return successfullyTerminated.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has NOT generated!');
            return err;
        });
    }},
    waitForClusterStop:        { value: function ()  {
        var EC = protractor.ExpectedConditions;

        var successfullyStopped = element(by.css('input#notification-n-filtering[value*="successfully stopped"]'));

        var notifications = ['Stopping Ambari services', 'Infrastructure is now stopping', 'Infrastructure successfully stopped'];
        var messages = ['Ambari services has NOT stopping!', 'Infrastructure has NOT stopping!', 'Cluster stopping has NOT finished!'];

        this.checkingNotifications(notifications, messages);

        return browser.driver.wait(EC.visibilityOf(successfullyStopped), 20000, 'The cluster has NOT been stopped!').then(function() {
            return successfullyStopped.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has NOT generated!');
            return err;
        });
    }},
    waitForClusterStart:             { value: function ()  {
        var EC = protractor.ExpectedConditions;

        var successfullyStarted = element(by.css('input#notification-n-filtering[value*="cluster started"]'));

        var notifications = ['Starting Ambari cluster', 'Starting Ambari services', 'Ambari cluster started'];
        var messages = ['Ambari cluster has NOT started!', 'Ambari services has NOT started!', 'Ambari restarting has NOT finished!'];

        this.checkingNotifications(notifications, messages);

        return browser.driver.wait(EC.visibilityOf(successfullyStarted), 20000, 'The cluster has NOT been started!').then(function() {
            return successfullyStarted.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has NOT generated!');
            return err;
        });
    }}
});

module.exports = WaitForUtils;