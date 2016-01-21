/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for Cluster Widget on the Cloudbreak Dashboard.
 */

'use strict';

var WidgetModule = ( function () {
    this.widgetBar = element(by.css('div.row.cluster-block.collapse.in'));
    this.clusterWidgets = element.all(by.repeater('cluster in $root.clusters'));

    this.isClusterPresent = function (name) {
        return this.clusterWidgets.filter(function (cluster) {
            cluster.element(by.cssContainingText('a', name));
            return browser.wait(function() {
                return cluster.element(by.cssContainingText('a', name)).isDisplayed();
            }, 20000, 'Cluster with this name is NOT present!', function(err) {
                console.log(err);
                return false;
            });
        });
    };

    this.isClusterTerminated = function (name) {
        browser.waitForAngular();
        browser.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state0-stop-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state0-stop-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    };

    this.getClusterStarted = function () {
        browser.waitForAngular();
        browser.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state2-run-blink')).isPresent();
        }, 30 * 20000, 'Cannot find this element!');
        return browser.wait(function() {
            return browser.element(by.css('div.mod-LED>span.state2-run-blink')).isDisplayed();
        }, 30 * 20000, 'Cannot see this element!');
    };

    this.openCluster = function (name) {
        browser.waitForAngular();
        return browser.element(by.cssContainingText('a#btn-cluster', name)).click().then(function() {
            return browser.waitForAngular();
        });
    };
});

module.exports = WidgetModule;