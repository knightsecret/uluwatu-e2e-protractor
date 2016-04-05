'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing Credentials on Dashboard', function () {
  var dashboardPage;
  var newName = 'autotest-aws';
  var newDescription = 'autotest';
  var iamRole = process.env.IAMROLE;
  var sshKey = process.env.SSHKEY;

  describe('with test credential', function () {
    dashboardPage = new DashboardPage();

    it('Delete if ' + newName + ' credential is already present', function () {
      dashboardPage.deleteAWSCredential(newName);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(0);
      });
    });

    it('Create new ' + newName + ' credential', function () {
      dashboardPage.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(1);
      });
    });
  });
});