'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing network creation', function () {
  var dashboardPage;
  var newName = 'autotest-kilo-net';
  var newDescription = 'autotest';
  var newSubnetCIDR = '10.0.0.0/24';
  var newFloatingPoolID = '999e09bc-cf75-4a19-98fb-c0b4ddee6d93';

  describe('with ' + newName + ' network', function () {
    dashboardPage = new DashboardPage();
    var defaultNetworks = 0;

    beforeAll(function() {
      console.log('Network creation test setup has started!');
      dashboardPage.deleteNetwork(newName);
      dashboardPage.getBadgeValue(1).then(function (value) {
          defaultNetworks = value;
      });
    });

    it('Default networks should be available', function () {
      expect(dashboardPage.getDefaultNetworks).toBeTruthy();
    });

    it('Create new OpenStack network', function () {
      dashboardPage.createOSNetwork(newName, newDescription, newSubnetCIDR, newFloatingPoolID);
      dashboardPage.getBadgeValue(1).then(function (value) {
        expect(value).toBeGreaterThan(defaultNetworks);
      });
    });
  });
});