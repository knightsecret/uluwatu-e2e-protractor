'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing network creation', function () {
  var dashboardPage;
  var newName = 'autotest-kilo-net-' + browser.params.nameTag;
  var newDescription = 'autotest';
  var newSubnetCIDR = process.env.OSSUBNETCIDR;
  var newFloatingID = process.env.OSFLOATINGID;

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
      dashboardPage.createOSNetwork(newName, newDescription, newFloatingID, newSubnetCIDR);
      dashboardPage.getBadgeValue(1).then(function (value) {
        expect(value).toBeGreaterThan(defaultNetworks);
      });
    });
  });
});