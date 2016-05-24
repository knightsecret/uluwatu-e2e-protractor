/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */
var WaitForUtils = function () {

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
        var notificationBar = element(by.css('input#notification-n-filtering'));

        var runningLed = element(by.css('div.mod-LED>span.state5-run'));
        var clusterISRunning = EC.visibilityOf(runningLed);
        var clusterISFailed = EC.visibilityOf(element(by.css('div.mod-LED>span.state3-stop')));

        var creatingInfrastructure = element(by.css('input#notification-n-filtering[value*="Creating infrastructure"]'));
        var metadataCollection = element(by.css('input#notification-n-filtering[value*="collection finished"]'));
        var startingAmbariClusterServices = element(by.css('input#notification-n-filtering[value*="cluster services"]'));
        var startingAmbari = element(by.css('input#notification-n-filtering[value*="Starting Ambari"]'));
        var buildingAmbari = element(by.css('input#notification-n-filtering[value*="Building Ambari"]'));
        var builtAmbari = element(by.css('input#notification-n-filtering[value*="cluster built"]'));

        browser.driver.wait(EC.visibilityOf(creatingInfrastructure), 30 * 60000, 'The stack creation has NOT started!').then(function() {
            return creatingInfrastructure.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        browser.driver.wait(EC.visibilityOf(metadataCollection), 30 * 60000, 'Metadata collection has NOT finished!').then(function() {
            return metadataCollection.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        browser.driver.wait(EC.visibilityOf(startingAmbariClusterServices), 30 * 60000, 'Ambari services has NOT started!').then(function() {
            return startingAmbariClusterServices.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        browser.driver.wait(EC.visibilityOf(startingAmbari), 30 * 60000, 'Ambari cluster has NOT started!').then(function() {
            return startingAmbari.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        browser.driver.wait(EC.visibilityOf(buildingAmbari), 30 * 60000, 'Ambari building has NOT started!').then(function() {
            return buildingAmbari.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        browser.driver.wait(EC.visibilityOf(builtAmbari), 30 * 60000, 'Ambari building has NOT finished!').then(function() {
            return builtAmbari.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
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
    };

    this.waitForClusterRemove = function () {
        var EC = protractor.ExpectedConditions;
        var notificationBar = element(by.css('input#notification-n-filtering'));

        var terminatingCluster = element(by.css('input#notification-n-filtering[value*="Terminating the cluster"]'));
        var successfullyTerminated = element(by.css('input#notification-n-filtering[value*="successfully been terminated"]'));

        browser.driver.wait(EC.visibilityOf(terminatingCluster), 30 * 60000, 'The cluster termination has NOT started!').then(function() {
            return terminatingCluster.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            });
        });

        return browser.driver.wait(EC.visibilityOf(successfullyTerminated), 30 * 60000, 'The cluster has NOT been terminated!').then(function() {
            return successfullyTerminated.isDisplayed().then(function(isDisplayed) {
                notificationBar.getAttribute('value').then(function(message){
                    console.log(message);
                });
                return isDisplayed;
            }, function(err) {
                return false;
            });
        }, function(err) {
            console.log('The notification has not generated!');
            return err;
        });
    };
};

module.exports = WaitForUtils;