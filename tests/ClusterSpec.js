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
          console.log('Cluster creation test setup has started!');
          basePage.selectCredentialByName(credentialName);
      });

      afterAll(function() {
          console.log('Test suit teardown has started!');
          dashboardPage.deleteBlueprint(blueprintName);
          dashboardPage.deleteAWSCredential(credentialName);
      });

      it('Cluster should be launched then terminated', function (done) {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();

          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRun(clusterName)).toBeTruthy();
          done();

          expect(basePage.terminateCluster(clusterName)).toBeTruthy();

          expect(basePage.isClusterRemoved()).toBeTruthy();
          done();
      }, 40 * 60000);
  });
});