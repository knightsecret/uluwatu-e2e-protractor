'use strict';

var BasePage = require('../pages/BasePage.js');
var ClusterModule = require('../modules/ClusterModule.js');


describe('Cluster testing', function () {
  var basePage;
  var clusterModule;
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

    it('AWS cluster should be created', function () {
      clusterModule = new ClusterModule();

      basePage.openClusterCreate();
      clusterModule.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName);
      expect(clusterModule.isReviewAndLaunchOpened()).toBe(true);
    });

  });
});