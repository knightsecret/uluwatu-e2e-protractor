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
        var clusterISRunning = EC.visibilityOf(browser.element(by.css('div.mod-LED>span.state5-run')));
        var clusterISFailed = EC.visibilityOf(browser.element(by.css('div.mod-LED>span.state3-stop')));

        return browser.driver.wait(EC.or(clusterISRunning, clusterISFailed), 30 * 60000, 'The cluster is NOT visible!').then(function() {
            console.log('The cluster is visible!');
            return clusterISRunning.isDisplayed();
        }, function(err) {
            console.log('The cluster has NOT created!');
            return err;
        });
    };
});

module.exports = WaitForUtils;