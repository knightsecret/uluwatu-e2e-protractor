'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing Cloudbreak login', function () {
  var dashboardPage;
  var cloudbreakURL = '/#/';

  describe('with ' + process.env.USERNAME + ' user', function () {
    dashboardPage = new DashboardPage();

    it('should be at the Dashboard page', function () {
      expect(browser.getCurrentUrl()).toContain(cloudbreakURL);
    });

    it('should see default blueprints', function () {
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toBeGreaterThan(2);
      });
    });

  });
});