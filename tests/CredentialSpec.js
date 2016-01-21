'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing Credentials on Dashboard', function () {
  var dashboardPage;
  var newName = 'autotest-aws';
  var newDescription = 'autotest';
  var iamRole = process.env.IAMROLE;
  var sshKey = process.env.SSHKEY;

  describe('Create a new credential', function () {
    dashboardPage = new DashboardPage();

    it('autotest-aws', function () {
      dashboardPage.expandCredentials();
      dashboardPage.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(1);
      });
    });
  });
});