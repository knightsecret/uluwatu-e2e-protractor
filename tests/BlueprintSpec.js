'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing blueprint creation', function () {
  var dashboardPage;
  var newName = 'autotest-multi-node-hdfs-yarn';
  var newDescription = 'autotest';
  var newUrl = 'https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp';

  describe('with ' + newName + ' blueprint', function () {
    dashboardPage = new DashboardPage();

    beforeAll(function() {
      console.log('Blueprint creation test setup has started!');
      dashboardPage.deleteBlueprint(newName);
    });

    it('Default blueprints should be available', function () {
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(3);
      });
    });

    it('Create new blueprint', function () {
      dashboardPage.createBlueprint(newName, newDescription, newUrl);
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(4);
      });
    });
  });
});