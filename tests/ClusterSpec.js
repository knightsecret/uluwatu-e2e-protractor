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

        beforeAll(function () {
            console.log('AWS cluster creation test setup has started!');
            basePage.selectCredentialByName(credentialAWSName);
        });
        afterAll(function () {
            if (JSON.stringify(testResult).indexOf('\"passed\":false') !== -1) {
                isSkip = true;
            }
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
        });

        it('the new cluster should be installed', function () {
            expect(basePage.getSelectedCredential()).toEqual(credentialAWSName);
            expect(basePage.createNewAWSCluster(clusterAWSName, regionAWSName, networkAWSName, securityGroup, blueprintAWSName)).toBeTruthy();
            expect(basePage.isClusterInstalling()).toBeTruthy();
        });
        it('the new cluster should be launched', function (done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            expect(basePage.isClusterInstalled()).toBeTruthy();
            done();
        }, 40 * 60000);

        testResult = it('the new Cluster Details should be available', function () {
            expect(basePage.isClusterDetailsControllers(clusterAWSName)).toBeTruthy();
        }).result;
    });

    describe('new AWS cluster operations where', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();
        var nodeScalingUp = '6';
        var nodeScalingDown = '1';
        var hostGroup = 'slave_1';

        beforeAll(function () {
            console.log('Is cluster install was success: ' + isSkip);
        });
        afterAll(function () {
            console.log('AWS Test suit teardown has started!');

            dashboardPage.deleteBlueprint(blueprintAWSName);
            dashboardPage.deleteCredential(credentialAWSName);
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
        });

        it('the Cluster AutoScaling should be available', function () {
            if (isSkip) {
                pending(' The cluster install was not success! ');
            } else {
                expect(basePage.isAmbariAutoScalingAvailable(clusterAWSName)).toBeTruthy();
                expect(basePage.isScalingHostGroupsAvailable(clusterAWSName)).toBeTruthy();
            }
        });

        it('the Cluster should be stopped', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.stopCluster(clusterAWSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterStopped()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
        it('the Cluster should be started', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.startCluster(clusterAWSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterStarted()).toBeTruthy();
                done();
            }
        }, 40 * 60000);

        it('the Cluster should be up scaled', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.upScaleCluster(clusterAWSName, hostGroup, nodeScalingUp)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterUpScaled()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
        it('the Cluster should be down scaled', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.downScaleCluster(clusterAWSName, hostGroup, nodeScalingDown)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterDownScaled()).toBeTruthy();
                done();
            }
        }, 40 * 60000);

        it('the Cluster should be terminated', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.terminateCluster(clusterAWSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterRemoved()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
    });

    describe('a new OpenStack cluster where', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();

        beforeAll(function () {
            console.log('OpenStack cluster creation test setup has started!');
            basePage.selectCredentialByName(credentialOSName);
        });
        afterAll(function () {
            if (JSON.stringify(testResult).indexOf('\"passed\":false') !== -1) {
                isSkip = true;
            }
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
        });

        it('the new cluster should be installed', function () {
            expect(basePage.getSelectedCredential()).toEqual(credentialOSName);
            expect(basePage.createNewOSCluster(clusterOSName, regionOSName, networkOSName, securityGroup, blueprintOSName)).toBeTruthy();
            expect(basePage.isClusterInstalling()).toBeTruthy();
        });
        it('the new cluster should be launched', function (done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            expect(basePage.isClusterInstalled()).toBeTruthy();
            done();
        }, 40 * 60000);

        testResult = it('the new Cluster Details should be available', function () {
            expect(basePage.isClusterDetailsControllers(clusterOSName)).toBeTruthy();
        }).result;
    });

    describe('on a new OpenStack cluster operations where', function () {
        basePage = new BasePage();
        dashboardPage = new DashboardPage();
        var nodeScalingUp = '1';
        var nodeScalingDown = '1';
        var hostGroup = 'slave_2';

        beforeAll(function () {
            console.log(isSkip);
        });
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

        it('the Cluster AutoScaling should be available', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isAmbariAutoScalingAvailable(clusterOSName)).toBeTruthy();
                expect(basePage.isScalingHostGroupsAvailable(clusterOSName)).toBeTruthy();
                done();
            }
        }, 40 * 60000);

        it('the Cluster should be stopped', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.stopCluster(clusterOSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterStopped()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
        it('the Cluster should be started', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.startCluster(clusterOSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterStarted()).toBeTruthy();
                done();
            }
        }, 40 * 60000);

        it('the Cluster should be up scaled', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.upScaleCluster(clusterOSName, hostGroup, nodeScalingUp)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterUpScaled()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
        it('the Cluster should be down scaled', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.downScaleCluster(clusterOSName, hostGroup, nodeScalingDown)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterDownScaled()).toBeTruthy();
                done();
            }
        }, 40 * 60000);

        it('the Cluster should be terminated', function (done) {
            if (isSkip) {
                pending(' The cluster install was not success! ');
                done();
            } else {
                expect(basePage.terminateCluster(clusterOSName)).toBeTruthy();

                jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
                expect(basePage.isClusterRemoved()).toBeTruthy();
                done();
            }
        }, 40 * 60000);
    });
});