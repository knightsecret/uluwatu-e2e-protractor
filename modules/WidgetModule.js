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
            return cluster.element(by.cssContainingText('a', name));
        }).isDisplayed();
    };

    this.getClusterStarted = function (name) {
        return this.clusterWidgets.filter(function (cluster, index) {
            cluster.element(by.cssContainingText('a', name));
            return browser.wait(function() {
                console.log('The cluster is running.')
                return cluster.element(by.css('div.mod-LED>span.state5-run')).isDisplayed();
            }, 30 * 60000, 'Cannot find this element!', function(err) {
                console.log('The cluster is stopped.')
                return cluster.element(by.css('div.mod-LED>span.state3-stop')).isDisplayed();
            });
        });
    };
});

module.exports = WidgetModule;