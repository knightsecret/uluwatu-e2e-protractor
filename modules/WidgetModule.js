/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for Cluster Widget on the Cloudbreak Dashboard.
 */

'use strict';

var WidgetModule = function () {
    this.clusterSection = element(by.css('section.clusters'));
};

WidgetModule.prototype = Object.create({}, {
    widgetBar:           {      get: function () {    return element(by.css('div.row.cluster-block.collapse.in'));   }},
    clusterWidgets:      {      get: function () {    return  element.all(by.repeater('cluster in $root.clusters')); }},

    isClusterPresent:                            { value: function (name) {
        browser.waitForAngular();
        browser.driver.wait(function() {
            return element(by.cssContainingText('a#btn-cluster', name)).isPresent();
        }, 20000, 'Cluster with this name is NOT present!');
        return browser.driver.wait(function() {
            return element(by.cssContainingText('a#btn-cluster', name)).isDisplayed();
        }, 20000, 'Cluster with this name is NOT displayed!');
    }},
    isClusterTerminated:                         { value: function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        browser.waitForAngular();
        browser.driver.wait(function() {
            return element(by.css('div.mod-LED>span.state0-stop-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.driver.wait(function() {
            return element(by.css('div.mod-LED>span.state0-stop-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    }},
    isClusterStarted:                           { value: function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        browser.waitForAngular();
        browser.driver.wait(function() {
            return element(by.css('div.mod-LED>span.state2-run-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.driver.wait(function() {
            return element(by.css('div.mod-LED>span.state2-run-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    }},
    openClusterPanel:                           { value: function (name) {
        var EC = protractor.ExpectedConditions;

        var openButton = element(by.cssContainingText('a#btn-cluster', name));
        var clusterNameTag = element(by.cssContainingText('h4.ng-binding', name));

        return browser.driver.wait(EC.visibilityOf(clusterNameTag), 5000,'Cluster panel has NOT opened!').then(function() {

        }, function(err) {
            return browser.driver.wait(EC.elementToBeClickable(openButton), 5000, 'Cluster open button is NOT click able!').then(function() {
                return openButton.click();
            }).then(function() {
                return browser.driver.wait(EC.visibilityOf(clusterNameTag), 5000,'Cluster panel has NOT clicked at 1st!').then(function() {

                }, function(err) {
                    return browser.driver.actions().click(openButton).perform();
                });
            });
        });
    }}
});
module.exports = WidgetModule;