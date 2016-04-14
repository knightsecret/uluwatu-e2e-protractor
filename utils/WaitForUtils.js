/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */
var WaitForUtils = ( function () {

    this.isWarningDisplayed = function (expectedVisibility) {
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
    };

    this.waitForClusterStart = function () {
        var EC = protractor.ExpectedConditions;
        var runningLed = browser.element(by.css('div.mod-LED>span.state5-run'));
        var clusterISRunning = EC.visibilityOf(runningLed);
        var clusterISFailed = EC.visibilityOf(browser.element(by.css('div.mod-LED>span.state3-stop')));

        return browser.driver.wait(EC.or(clusterISRunning, clusterISFailed), 30 * 60000, 'The cluster is NOT visible!').then(function() {
        //    console.log('The cluster is visible!');
            return runningLed.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The cluster has NOT created!');
            return err;
        });
    };

    this.waitForClusterRemove = function () {
        var EC = protractor.ExpectedConditions;
        var notificationTerminated = browser.element(by.css('input#notification-n-filtering[value*="successfully been terminated"]'));
        var clusterISTerminated = EC.visibilityOf(notificationTerminated);

        return browser.driver.wait(EC.or(clusterISTerminated), 30 * 60000, 'The cluster is NOT terminated!').then(function() {
        //    console.log('The cluster is terminated successfully!');
            return notificationTerminated.isDisplayed().then(function(isDisplayed) {
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has not generated!');
            return err;
        });
    };
});

module.exports = WaitForUtils;