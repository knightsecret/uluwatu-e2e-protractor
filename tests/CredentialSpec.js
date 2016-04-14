'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing credential creation', function () {
  var dashboardPage;
  var newName = 'autotest-aws';
  var newDescription = 'autotest';
  var iamRole = process.env.IAMROLE;
  var sshKey = process.env.SSHKEY;

  describe('with ' + newName + ' credential', function () {
    dashboardPage = new DashboardPage();

    it('If credential has already present, delete it', function () {
      dashboardPage.deleteAWSCredential(newName);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(0);
      });
    });

    it('Create new credential', function () {
      dashboardPage.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(1);
      });
    });
  });
});