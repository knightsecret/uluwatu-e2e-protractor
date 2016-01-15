'use strict';

var DashboardPage = require('../pages/DashboardPage.js');
var CredentialModule = require('../modules/CredentialModule.js');

describe('Testing Credentials on Dashboard', function () {
  var dashboardPage;
  var credentialModule;
  var newName = 'autotest-aws';
  var newDescription = 'autotest';
  var iamRole = process.env.IAMROLE;
  var sshKey = process.env.SSHKEY;

  describe('Create a new credential', function () {
    it('autotest-aws', function () {
      dashboardPage = new DashboardPage();
      credentialModule = new CredentialModule();

      dashboardPage.expandCredentials();
      credentialModule.createAWSCredential(newName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toEqual(1);
      });
    });
  });
});