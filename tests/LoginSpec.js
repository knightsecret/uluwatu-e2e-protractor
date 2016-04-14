'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing Cloudbreak login', function () {
  var dashboardPage;
  var preprodURL = 'https://pre-prod-cloudbreak.sequenceiq.com/#/';

  describe('with ' + process.env.USERNAME + ' user', function () {
    dashboardPage = new DashboardPage();

    it('should be at the Dashboard page', function () {
      expect(browser.getCurrentUrl()).toEqual(preprodURL);
    });

    it('should see default blueprints', function () {
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toEqual(3);
      });
    });

  });
});