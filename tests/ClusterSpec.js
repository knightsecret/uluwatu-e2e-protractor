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
  var clusterRunning = false;

  describe('on a new AWS cluster', function () {
      basePage = new BasePage();
      dashboardPage = new DashboardPage();

      beforeAll(function() {
          console.log('Cluster creation test setup has started!');
          basePage.selectCredentialByName(credentialName);
      });

      afterAll(function() {
          if(clusterRunning) {
              console.log(clusterRunning.result.status);
          } else {
              console.log(clusterRunning);
          }
          console.log('Test suit teardown has started!');
          dashboardPage.deleteBlueprint(blueprintName);
          dashboardPage.deleteAWSCredential(credentialName);
      });

      clusterRunning = it('Cluster should be launched', function (done) {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();

          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRun(clusterName)).toBeTruthy();
          done();
      }, 40 * 60000);
      if(clusterRunning) {
          it('Cluster Details should be available', function () {
              expect(basePage.isClusterDetailsControllers(clusterName)).toBeTruthy();
          });
          it('Cluster AutoScaling should be available', function () {
              expect(basePage.isAmbariAutoScalingAvailable(clusterName)).toBeTruthy();
          });
          it('Cluster should be terminated', function (done) {
              expect(basePage.terminateCluster(clusterName)).toBeTruthy();

              jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterRemoved()).toBeTruthy();
              done();
          }, 40 * 60000);
      } else {
          xit('Cluster Details should be available', function () {});
          xit('Cluster AutoScaling should be available', function () {});
          xit('Cluster should be terminated', function () {});
      }
  });
});