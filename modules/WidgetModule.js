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
            return browser.element(by.cssContainingText('a#btn-cluster', name)).isPresent();
        }, 20000, 'Cluster with this name is NOT present!');
        return browser.driver.wait(function() {
            return browser.element(by.cssContainingText('a#btn-cluster', name)).isDisplayed();
        }, 20000, 'Cluster with this name is NOT displayed!');
    }},
    isClusterTerminated:                         { value: function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        browser.waitForAngular();
        browser.driver.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state0-stop-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.driver.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state0-stop-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    }},
    isClusterStarted:                           { value: function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        browser.waitForAngular();
        browser.driver.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state2-run-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.driver.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state2-run-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    }},
    openCluster:                                 { value: function (name) {
        var EC = protractor.ExpectedConditions;
        var openButton = browser.element(by.cssContainingText('a#btn-cluster', name));
        // We need to fix the GUI here. Something goes wrong with Angular here.
        return browser.driver.wait(EC.elementToBeClickable(openButton), 20000, 'Open button is NOT click able!').then(function() {
        //    console.log('Open button is clicked 1st!');
            return browser.driver.actions().doubleClick(openButton).perform();
        }).then(function() {
            return browser.driver.wait(EC.invisibilityOf(openButton), 20000,'Open button has NOT clicked at 1st!').then(function() {
        //        console.log('Open button has already clicked at 1st!');
            }, function(err) {
        //        console.log('Open button is clicked 2nd!');
                return browser.driver.actions().click(openButton).perform();
            });
        });
        browser.waitForAngular();
    }}
});
module.exports = WidgetModule;