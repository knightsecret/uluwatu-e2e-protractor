'use strict';

var BasePage = require('../pages/BasePage.js');
var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing cluster creation', function () {
  var basePage;
  var dashboardPage;
  var credentialName = 'autotest-aws';
  var blueprintName = 'autotest-multi-node-hdfs-yarn';
  var clusterName = 'autotest-aws';
  var regionName = 'US West (N. California)';
  var networkName = 'default-aws-network';
  var securityGroup = 'all-services-port';

  describe('on a new AWS cluster', function () {
      basePage = new BasePage();
      dashboardPage = new DashboardPage();

      beforeAll(function() {
          console.log('Setup has started!');
          basePage.selectCredentialByName(credentialName);
      });

      afterAll(function() {
          console.log('Teardown has started!');
          dashboardPage.deleteBlueprint(blueprintName);
          dashboardPage.deleteAWSCredential(credentialName);
      });

      it('Cluster should be launched then terminated', function (done) {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();

          console.log(clusterName + 'cluster infrastructure is building!');
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRun()).toBeTruthy();
          done();
          console.log(clusterName + 'cluster is up and running!');

          expect(basePage.terminateCluster(clusterName)).toBeTruthy();
          console.log(clusterName + 'cluster has been terminated!');

          console.log('Removing the cluster infrastructure!');
          expect(basePage.isClusterRemoved()).toBeTruthy();
          done();
          console.log(clusterName + 'cluster has been removed!');
      }, 30 * 60000);
  });
});