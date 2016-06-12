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
  var specResult;
  var isClusterUp = true;

  describe('on a new AWS cluster', function () {
      basePage = new BasePage();
      dashboardPage = new DashboardPage();

      beforeAll(function() {
          console.log('Cluster creation test setup has started!');
          basePage.selectCredentialByName(credentialName);
      });
      afterAll(function() {
          console.log(specResult.result.status);
          console.log(isClusterUp);

          console.log('Test suit teardown has started!');
          dashboardPage.deleteBlueprint(blueprintName);
          dashboardPage.deleteAWSCredential(credentialName);
      });
      specResult = it('Cluster should be launched', function (done) {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
          expect(basePage.isClusterInstalling()).toBeTruthy();

          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          isClusterUp = basePage.isClusterInstalled();

          expect(isClusterUp).toBeTruthy();
          done();
      }, 40 * 60000);
      it('Cluster Details should be available', function () {
          if(isClusterUp) {
              expect(basePage.isClusterDetailsControllers(clusterName)).toBeTruthy();
          } else {
              pending();
          }
      });
      it('Cluster AutoScaling should be available', function () {
          if(isClusterUp) {
              expect(basePage.isAmbariAutoScalingAvailable(clusterName)).toBeTruthy();
          } else {
              pending();
          }
      });
      it('Cluster should be stopped', function (done) {
          if(isClusterUp) {
              expect(basePage.stopCluster(clusterName)).toBeTruthy();

              jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterStopped()).toBeTruthy();
              done();
          } else {
              pending();
              done();
          }
      }, 40 * 60000);
      it('Cluster should be started', function (done) {
          if(isClusterUp) {
              expect(basePage.startCluster(clusterName)).toBeTruthy();

             jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterStarted()).toBeTruthy();
              done();
          } else {
              pending();
              done();
          }
      }, 40 * 60000);
/*
          it('Cluster should be scaled up', function (done) {
              expect(basePage.upScaleCluster(clusterName, 6)).toBeTruthy();

              jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterUpScaled()).toBeTruthy();
              done();
          }, 40 * 60000);
          it('Cluster should be scaled down', function (done) {
              expect(basePage.downScaleCluster(clusterName, 2)).toBeTruthy();

              jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterDownScaled()).toBeTruthy();
              done();
          }, 40 * 60000);
*/
      it('Cluster should be terminated', function (done) {
          if(isClusterUp) {
              expect(basePage.terminateCluster(clusterName)).toBeTruthy();

              jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
              expect(basePage.isClusterRemoved()).toBeTruthy();
              done();
          } else {
              pending();
              done();
          }
      }, 40 * 60000);
  });
});