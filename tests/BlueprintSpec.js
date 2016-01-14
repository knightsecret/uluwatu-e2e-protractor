'use strict';

var DashboardPage = require('../pages/DashboardPage.js');
var BlueprintModule = require('../modules/BlueprintModule.js');

describe('Testing Blueprints on Dashboard', function () {
  var dashboardPage;
  var blueprintModule;
  describe('Create a new blueprint', function () {
    it('autotest-multi-node-hdfs-yarn', function () {
      dashboardPage = new DashboardPage();
      blueprintModule = new BlueprintModule();

      dashboardPage.expandBlueprints();

      blueprintModule.createBlueprint('autotest-multi-node-hdfs-yarn', 'autotest', 'https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp');
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(4);
      });
    });
  });
});