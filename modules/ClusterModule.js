/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for Create Cluster pane on the Cloudbreak Dashboard.
 */

'use strict';

var ClusterModule = ( function () {
    this.clustercreateForm = element(by.css('div#create-cluster-panel-collapse'));
    // Tab pages
    this.configureTab = element(by.cssContainingText('a', 'Configure Cluster'));
    this.networkTab = element(by.cssContainingText('a', 'Setup Network and Security'));
    this.blueprintTab = element(by.cssContainingText('a', 'Choose Blueprint'));
    this.filesystemTab = element(by.cssContainingText('a', 'Add File System'));
    this.reviewlaunchTab = element(by.cssContainingText('a', 'Review and Launch'));
    // Configure Cluster tab
    this.clusternameBox = element(by.css('div#configure_cluster input#cl_clusterName'));
    this.securityButton = element.all(by.cssContainingText('div#configure_cluster .btn.btn-sm.btn-default.ng-binding', 'Setup Network and Security'));
    // Setup Network and Security tab
    this.networknameSelect = element(by.css('select#selectClusterNetwork'));
    this.securitygroupSelect = element(by.css('select#select-cluster-securitygroup'));
    this.blueprintButton = element(by.cssContainingText('div#configure_security_group .btn.btn-sm.btn-default.ng-binding', 'Choose Blueprint'));
    // Choose Blueprint tab
    this.reviewlaunchButton = element(by.cssContainingText('div#configure_host_groups .btn.btn-sm.btn-default.ng-binding', 'Review and Launch'));
    // Review and Launch
    this.startclusterButton = element(by.css('a#createCluster'));

    this.typeName = function (name) {
        return this.clusternameBox.sendKeys(name);
    };

    this.selectRegion = function (name) {
        return this.clustercreateForm.element(by.cssContainingText('option', name)).click();
    };

    this.clickSetupNetworkSecurity = function () {
        return this.securityButton.click().then(function() {
            return browser.wait(function() {
                return browser.element(by.css('select#selectClusterNetwork')).isDisplayed();
            }, 20000);
        });
    };

    this.selectNetwork = function (name) {
        return this.networknameSelect.element(by.cssContainingText('option', name));
    };

    this.selectSecurityGroup = function (name) {
        return this.securitygroupSelect.element(by.cssContainingText('option', name));
    };

    this.clickChooseBlueprint = function () {
        return this.blueprintButton.click().then(function() {
            return browser.wait(function() {
                return browser.element(by.css('select#selectBlueprint')).isDisplayed();
            }, 20000);
        });
    };

    this.selectBlueprint = function (name) {
        return this.clustercreateForm.element(by.cssContainingText('option', name)).click().then(function() {
            browser.waitForAngular();
            return browser.wait(function() {
                return browser.element(by.cssContainingText('div#configure_host_groups .btn.btn-sm.btn-default.ng-binding', 'Review and Launch')).isDisplayed();
            }, 20000);
        });
    };

    this.clickReviewAndLauch = function () {
        return this.reviewlaunchButton.click().then(function() {
            browser.waitForAngular();
            return browser.wait(function() {
                return browser.element(by.css('a#createCluster')).isDisplayed();
            }, 20000);
        });
    };

    this.isReviewAndLaunchOpened = function () {
        return this.startclusterButton.isDisplayed();
    };

    this.createNewAWSCluster = function (clusterName, regionName, networkName, securityGroup, blueprintName) {
        this.typeName(clusterName);
        this.selectRegion(regionName);
        this.clickSetupNetworkSecurity();

        this.selectNetwork(networkName);
        this.selectSecurityGroup(securityGroup);
        this.clickChooseBlueprint();

        this.selectBlueprint(blueprintName);
        this.clickReviewAndLauch();
    };
});
module.exports = ClusterModule;