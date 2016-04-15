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

    beforeAll(function() {
      console.log('Setup has started!');
      dashboardPage.deleteAWSCredential(newName);
    });

    it('Create new credential', function () {
      dashboardPage.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(1);
      });
    });
  });
});