'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing Blueprints on Dashboard', function () {
  var dashboardPage;
  var newName = 'autotest-multi-node-hdfs-yarn';
  var newDescription = 'autotest';
  var newUrl = 'https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp';

  describe('Create a new blueprint', function () {
    dashboardPage = new DashboardPage();

    it('autotest-multi-node-hdfs-yarn', function () {
      dashboardPage.expandBlueprints();
      dashboardPage.createBlueprint(newName, newDescription, newUrl);
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(4);
      });
    });
  });
});