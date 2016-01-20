'use strict';

var BasePage = require('../pages/BasePage.js');
var ClusterModule = require('../modules/ClusterModule.js');
var WidgetModule = require('../modules/WidgetModule.js');

describe('Cluster testing', function () {
  var basePage;
  var clusterModule;
  var widgetModule;
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
        clusterModule = new ClusterModule();

        basePage.openClusterCreate();
        clusterModule.createNewAWSCluster(clusterName, regionName, networkName, securityGroup, blueprintName);

        widgetModule = new WidgetModule();

        expect(widgetModule.isClusterPresent(clusterName));
    });

    it('AWS cluster should be done', function () {
        clusterModule = new ClusterModule();

        expect(widgetModule.getClusterStarted(clusterName));
    });
  });
});