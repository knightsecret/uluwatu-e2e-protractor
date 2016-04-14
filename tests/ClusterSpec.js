'use strict';

var BasePage = require('../pages/BasePage.js');
var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing cluster creation', function () {
  var basePage;
  var dashboardPage;
  var credentialName = 'autotest-aws';
  var blueprintName = 'autotest-multi-node-hdfs-yarn';
  var clusterName = 'autotest-aws';
  var regionName = 'US East(N. Virginia)';
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

      it('AWS credential should be selected', function () {
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
      });

      it('Infrastructure should be set up', function () {
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
      });

      it('Infrastructure creation should be started', function () {
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();
      });

      it('New cluster should be up and running', function (done) {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRun()).toBeTruthy();
          done();
      }, 30 * 60000);

      it('Cluster should be terminated', function () {
          expect(basePage.terminateCluster(clusterName)).toBeTruthy();
      });

      it('Cluster should be removed', function (done) {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRemoved()).toBeTruthy();
          done();
      }, 30 * 60000);
  });
});