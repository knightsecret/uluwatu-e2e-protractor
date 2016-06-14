'use strict';

var BasePage = require('../pages/BasePage.js');
var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing cluster creation', function () {
  var basePage;
  var dashboardPage;
  var credentialName = 'autotest-aws';
  var blueprintName = 'autotest-multi-node-hdfs-yarn';
  var clusterName = 'autotest-aws';
  var regionName = 'EU (Ireland)';
  var networkName = 'default-aws-network';
  var securityGroup = 'all-services-port';
  var isClusterUp;

  describe('on a new AWS cluster', function () {
      basePage = new BasePage();
      dashboardPage = new DashboardPage();

      beforeAll(function() {
          console.log('Cluster creation test setup has started!');
          basePage.selectCredentialByName(credentialName);
      });
      afterAll(function() {
          console.log('Test suit teardown has started!');
          dashboardPage.deleteBlueprint(blueprintName);
          dashboardPage.deleteAWSCredential(credentialName);
      });

      it('Cluster should be installed', function (done) {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
          expect(basePage.isClusterInstalling()).toBeTruthy();
          // 'Cluster should be launched'
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          basePage.isClusterInstalled().then(function(result) {
              return isClusterUp = result;
          });
          expect(isClusterUp).toBeTruthy();

          if(isClusterUp) {
              // 'Cluster Details should be available'
              expect(basePage.isClusterDetailsControllers(clusterName)).toBeTruthy();
              // 'Cluster AutoScaling should be available'
              expect(basePage.isAmbariAutoScalingAvailable(clusterName)).toBeTruthy();
              // 'Cluster should be stopped'
              expect(basePage.stopCluster(clusterName)).toBeTruthy();
              expect(basePage.isClusterStopped()).toBeTruthy();
              // 'Cluster should be started'
              expect(basePage.startCluster(clusterName)).toBeTruthy();
              expect(basePage.isClusterStarted()).toBeTruthy();
              // 'Cluster should be terminated'
              expect(basePage.terminateCluster(clusterName)).toBeTruthy();
              expect(basePage.isClusterRemoved()).toBeTruthy();
          }
          done();
      }, 40 * 60000);
  });
});