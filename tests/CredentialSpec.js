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
    var defaultCredentials = 0;

    beforeAll(function() {
      console.log('Credential creation test setup has started!');
      dashboardPage.deleteAWSCredential(newName);
      dashboardPage.getBadgeValue(4).then(function (value) {
        defaultCredentials = value;
      });
    });

    it('Create new credential', function () {
      dashboardPage.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toBeGreaterThan(defaultCredentials);
      });
    });
  });
});