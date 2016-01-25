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
    // Review and Launch

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
        return this.clustercreateForm.element(by.cssContainingText('option', name)).click();
    };

    this.isBlueprintSelected = function (name) {
        browser.waitForAngular();
        return browser.wait(function() {
            return browser.element(by.cssContainingText('div#create-cluster-panel-collapse option', name)).isSelected();
        }, 20000, 'Cannot select ' + name + ' blueprint!');
    };

    this.clickReviewAndLauch = function () {
        var EC = protractor.ExpectedConditions;
        var launchButton = browser.element(by.cssContainingText('div#configure_host_groups .btn.btn-sm.btn-default.ng-binding', 'Review and Launch'));
        // We need to fix the GUI here. Something goes wrong with Angular here.
       return browser.driver.wait(EC.elementToBeClickable(launchButton), 5000, 'Launch button is NOT click able!').then(function() {
           console.log('Launch button is clicked 1st!');
           return browser.driver.actions().doubleClick(launchButton).perform();
       }).then(function() {
           return browser.driver.wait(EC.invisibilityOf(launchButton), 5000, 'Launch button has NOT clicked at 1st!').then(function() {
               console.log('Launch button has already clicked at 1st!');
           }, function(err) {
               console.log('Launch button is clicked 2nd!');
               return browser.driver.actions().click(launchButton).perform();
           });
       });
    };

    this.isReviewAndLaunchOpened = function () {
        browser.wait(function() {
            return browser.element(by.css('a#createCluster')).isPresent();
        }, 20000);
        return browser.wait(function() {
            return browser.element(by.css('a#createCluster')).isDisplayed();
        }, 20000);
    };

    this.isClusterDetailsOpened = function () {
        browser.waitForAngular();
        return browser.wait(function() {
            return browser.element(by.css('a#terminate-btn')).isDisplayed();
        }, 20000);
    };

    this.clickTerminateButton = function () {
        var EC = protractor.ExpectedConditions;
        var terminateButton = browser.element(by.css('a#terminate-btn'));
        // We need to fix the GUI here. Something goes wrong with Angular here.
        return browser.driver.wait(EC.elementToBeClickable(terminateButton), 5000, 'Terminate button is NOT click able!').then(function() {
            console.log('Terminate button is clicked 1st!');
            return browser.driver.actions().doubleClick(terminateButton).perform();
        }).then(function() {
            return browser.driver.wait(EC.visibilityOf(browser.element(by.css('button#terminateStackBtn'))), 5000,'Terminate button has NOT clicked at 1st!').then(function() {
                console.log('Terminate button has already clicked at 1st!');
            }, function(err) {
                console.log('Terminate button is clicked 2nd!');
                return browser.driver.actions().click(terminateButton).perform();
            });
        });
    };

    this.clickConfirmTerminateButton = function () {
        var EC = protractor.ExpectedConditions;
        var forceTerminateBox = browser.element(by.css('input#modal-terminate-forced'));
        var stackTerminateButton = browser.element(by.css('button#terminateStackBtn'));
        // We need to fix the GUI here. Something goes wrong with Angular here.
        return browser.driver.wait(EC.elementToBeClickable(forceTerminateBox), 5000, 'Force terminate checkbox is NOT click able!').then(function() {
            console.log('Force terminate is clicked 1st!');
            browser.driver.actions().click(forceTerminateBox).perform();
            return browser.driver.actions().click(stackTerminateButton).perform();
        }).then(function() {
            return browser.driver.wait(EC.invisibilityOf(stackTerminateButton), 5000,'Terminate button has NOT clicked at 1st!').then(function() {
                console.log('Terminate button has already clicked at 1st!');
            }, function(err) {
                console.log('Terminate button is clicked 2nd!');
                browser.driver.actions().click(forceTerminateBox).perform();
                return browser.driver.actions().click(stackTerminateButton).perform();
            });
        });
    };

    this.startCluster = function () {
        var EC = protractor.ExpectedConditions;
        var startButton = browser.element(by.css('a#createCluster'));
        // We need to fix the GUI here. Something goes wrong with Angular here.
        return browser.driver.wait(EC.elementToBeClickable(startButton), 5000, 'Start button is NOT click able!').then(function() {
            console.log('Start button is clicked 1st!');
            return browser.driver.actions().doubleClick(startButton).perform();
        }).then(function() {
            return browser.driver.wait(EC.invisibilityOf(startButton), 5000,'Start button has NOT clicked at 1st!').then(function() {
                console.log('Start button has already clicked at 1st!');
            }, function(err) {
                console.log('Start button is clicked 2nd!');
                return browser.driver.actions().click(startButton).perform();
            });
        });
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
        this.startCluster();

    };
});
module.exports = ClusterModule;