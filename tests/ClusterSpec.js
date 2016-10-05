'use strict';

var BasePage = require('../pages/BasePage.js');
var DashboardPage = require('../pages/DashboardPage.js');
var originalJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

describe('Testing', function () {
    var basePage;
    var dashboardPage;
    var credentialAWSName = 'autotest-aws-cred-' + browser.params.nameTag;
    var credentialOSName = 'autotest-kilo-cred-' + browser.params.nameTag;
    var blueprintAWSName = 'autotest-multi-' + browser.params.nameTag;
    var blueprintOSName = 'autotest-scaling-' + browser.params.nameTag;
    var templateOSName = 'autotest-kilo-tmp-' + browser.params.nameTag;
    var clusterAWSName = 'autotest-aws-cls-' + browser.params.nameTag;
    var clusterOSName = 'autotest-os-cls-' + browser.params.nameTag;
    var regionAWSName = 'EU (Ireland)';
    var regionOSName = 'local';
    var networkAWSName = 'default-aws-network';
    var networkOSName = 'autotest-kilo-net-' + browser.params.nameTag;
    var securityGroup = 'all-services-port';
    var testResult;
    var isSkip = false;

    describe('a new AWS cluster creation where', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();

        function setSkip() {
            if(isSkip) {
                console.log('Is cluster install was NOT success: ' + isSkip);
            }
            return isSkip;
        }

        beforeAll(function () {
            console.log('AWS cluster creation test setup has started!');
            basePage.selectCredentialByName(credentialAWSName);
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;

            if (JSON.stringify(testResult).indexOf('\"passed\":false') !== -1) {
                isSkip = true;
            }
        });

        testResult = it('the new cluster should be installed', function () {
            expect(basePage.getSelectedCredential()).toEqual(credentialAWSName);
            expect(basePage.createNewAWSCluster(clusterAWSName, regionAWSName, networkAWSName, securityGroup, blueprintAWSName)).toBeTruthy();
            expect(basePage.isClusterInstalling()).toBeTruthy();
        }).result;
        if(setSkip()) {
            it('the new cluster should be launched');
            it('the new Cluster Details should be available');
        } else {
            it('the new cluster should be launched', function (done) {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterInstalled()).toBeTruthy();
                done();
            }, 40 * 60000);
            testResult = it('the new Cluster Details should be available', function () {
                expect(basePage.isClusterDetailsControllers(clusterAWSName)).toBeTruthy();
            }).result;
        }
    });

    describe('new AWS cluster operations', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();
        var nodeScalingUp = '6';
        var nodeScalingDown = '1';
        var hostGroup = 'slave_1';

        function setSkip() {
            if(isSkip) {
                console.log('Is cluster install was NOT success3: ' + isSkip);
            }
            return isSkip;
        }

        describe('where', function () {
            afterAll(function () {
                console.log('AWS Test suit teardown has started!');

                dashboardPage.deleteBlueprint(blueprintAWSName);
                dashboardPage.deleteCredential(credentialAWSName);
            });

            afterEach(function () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
            });

            if (setSkip()) {
                it('the Cluster AutoScaling should be available');

                it('the Cluster should be stopped');
                it('the Cluster should be started');

                it('the Cluster should be up scaled');
                it('the Cluster should be down scaled');

                it('the Cluster should be terminated');
            } else {
                it('the Cluster AutoScaling should be available', function () {
                    expect(basePage.isAmbariAutoScalingAvailable(clusterAWSName)).toBeTruthy();
                    expect(basePage.isScalingHostGroupsAvailable(clusterAWSName)).toBeTruthy();
                });

                it('the Cluster should be stopped', function (done) {
                    expect(basePage.stopCluster(clusterAWSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterStopped()).toBeTruthy();
                    done();
                }, 40 * 60000);
                it('the Cluster should be started', function (done) {
                    expect(basePage.startCluster(clusterAWSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterStarted()).toBeTruthy();
                    done();
                }, 40 * 60000);

                it('the Cluster should be up scaled', function (done) {
                    expect(basePage.upScaleCluster(clusterAWSName, hostGroup, nodeScalingUp)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterUpScaled()).toBeTruthy();
                    done();
                }, 40 * 60000);
                it('the Cluster should be down scaled', function (done) {
                    expect(basePage.downScaleCluster(clusterAWSName, hostGroup, nodeScalingDown)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterDownScaled()).toBeTruthy();
                    done();
                }, 40 * 60000);

                it('the Cluster should be terminated', function (done) {
                    expect(basePage.terminateCluster(clusterAWSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterRemoved()).toBeTruthy();
                    done();
                }, 40 * 60000);
            }
        });
    });

    describe('a new OpenStack cluster creation where', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();

        function setSkip() {
            if(isSkip) {
                console.log('Is cluster install was NOT success3: ' + isSkip);
            }
            return isSkip;
        }

        beforeAll(function () {
            console.log('OpenStack cluster creation test setup has started!');
            basePage.selectCredentialByName(credentialOSName);
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;

            if (JSON.stringify(testResult).indexOf('\"passed\":false') !== -1) {
                isSkip = true;
            }
        });

        testResult = it('the new cluster should be installed', function () {
            expect(basePage.getSelectedCredential()).toEqual(credentialOSName);
            expect(basePage.createNewOSCluster(clusterOSName, regionOSName, networkOSName, securityGroup, blueprintOSName)).toBeTruthy();
            expect(basePage.isClusterInstalling()).toBeTruthy();
        }).result;
        if(setSkip()) {
            it('the new cluster should be launched');
            it('the new Cluster Details should be available');
        } else {
            it('the new cluster should be launched', function (done) {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterInstalled()).toBeTruthy();
                done();
            }, 40 * 60000);
            testResult = it('the new Cluster Details should be available', function () {
                expect(basePage.isClusterDetailsControllers(clusterOSName)).toBeTruthy();
            }).result;
        }
    });

    describe('on new OpenStack cluster operations', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();
        var nodeScalingUp = '1';
        var nodeScalingDown = '1';
        var hostGroup = 'slave_2';

        function setSkip() {
            if (isSkip) {
                console.log('Is cluster install was NOT success3: ' + isSkip);
            }
            return isSkip;
        }

        describe('where', function () {
            afterAll(function () {
                console.log('OpenStack test suit teardown has started!');

                dashboardPage.deleteBlueprint(blueprintOSName);
                dashboardPage.deleteTemplate(templateOSName);
                dashboardPage.deleteNetwork(networkOSName);
                dashboardPage.deleteCredential(credentialOSName);
            });

            afterEach(function () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
            });

            if (setSkip()) {
                it('the Cluster AutoScaling should be available');

                it('the Cluster should be stopped');
                it('the Cluster should be started');

                it('the Cluster should be up scaled');
                it('the Cluster should be down scaled');

                it('the Cluster should be terminated');
            } else {
                it('the Cluster AutoScaling should be available', function (done) {
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isAmbariAutoScalingAvailable(clusterOSName)).toBeTruthy();
                    expect(basePage.isScalingHostGroupsAvailable(clusterOSName)).toBeTruthy();
                    done();
                }, 40 * 60000);

                it('the Cluster should be stopped', function (done) {
                    expect(basePage.stopCluster(clusterOSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterStopped()).toBeTruthy();
                    done();
                }, 40 * 60000);
                it('the Cluster should be started', function (done) {
                    expect(basePage.startCluster(clusterOSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterStarted()).toBeTruthy();
                    done();
                }, 40 * 60000);

                it('the Cluster should be up scaled', function (done) {
                    expect(basePage.upScaleCluster(clusterOSName, hostGroup, nodeScalingUp)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterUpScaled()).toBeTruthy();
                    done();
                }, 40 * 60000);
                it('the Cluster should be down scaled', function (done) {
                    expect(basePage.downScaleCluster(clusterOSName, hostGroup, nodeScalingDown)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterDownScaled()).toBeTruthy();
                    done();
                }, 40 * 60000);

                it('the Cluster should be terminated', function (done) {
                    expect(basePage.terminateCluster(clusterOSName)).toBeTruthy();

                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                    expect(basePage.isClusterRemoved()).toBeTruthy();
                    done();
                }, 40 * 60000);
            }
        });
    });
});