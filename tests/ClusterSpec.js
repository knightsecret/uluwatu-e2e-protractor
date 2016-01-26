'use strict';

var BasePage = require('../pages/BasePage.js');

describe('Cluster testing', function () {
  var basePage;
  var clusterName = 'autotest-aws';
  var regionName = 'US East(N. Virginia)';
  var networkName = 'default-aws-network';
  var securityGroup = 'all-services-port';
  var blueprintName = 'autotest-multi-node-hdfs-yarn';

  var credentialName = 'autotest-aws';

  describe('on a new cluster', function () {
      basePage = new BasePage();

      it('AWS credential should be selected', function () {
          basePage.selectCredentialByName(credentialName);
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
      });

      it('AWS cluster should be created', function () {
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
      });

      it('AWS cluster should be started', function () {
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();
      });

      it('AWS cluster should be run', function (done) {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
          expect(basePage.isClusterRun()).toBeTruthy();
          done();
      }, 30 * 60000);

      it('selected cluster should be terminated', function () {
          expect(basePage.terminateCluster(clusterName)).toBeTruthy();
      });
  });
});