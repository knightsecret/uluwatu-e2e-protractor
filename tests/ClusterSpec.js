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

  describe('create new cluster', function () {
      basePage = new BasePage();

      it('AWS credential should be selected', function () {
          basePage.selectCredentialByName(credentialName);
          expect(basePage.getSelectedCredential()).toEqual(credentialName);
      });

      it('AWS cluster should be started', function () {
          expect(basePage.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName)).toBeTruthy();
      });

      it('AWS cluster should be started', function () {
          expect(basePage.isClusterStarted(clusterName)).toBeTruthy();
      });

      it('selected cluster should be terminated', function () {
          expect(basePage.terminateCluster(clusterName)).toBeTruthy();
      });
  });
});