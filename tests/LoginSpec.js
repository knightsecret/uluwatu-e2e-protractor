'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Cloudbreak login', function () {
  var dashboardPage;

  describe('launch application', function () {
    dashboardPage = new DashboardPage();

    it('should be at the Dashboard page', function () {
      expect(browser.getCurrentUrl()).toEqual('https://pre-prod-cloudbreak.sequenceiq.com/#/');
    });

    it('should see default blueprints', function () {
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(3);
      });
    });

  });
});