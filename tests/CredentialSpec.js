'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing credential creation', function () {
  var dashboardPage;
  var newAWSName = 'autotest-aws-cred';
  var newOSName = 'autotest-kilo-cred';
  var newDescription = 'autotest';
  var userOS = process.env.OSUSER;
  var passwordOS = process.env.OSPASSWORD;
  var tenantOS = process.env.OSTENANT;
  var endpointOS = process.env.OSENDPOINT;
  var apiFacing = 'internal';
  var iamRole = process.env.IAMROLE;
  var sshKey = process.env.SSHKEY;

  describe('with ' + newAWSName + ' AWS credential', function () {
    dashboardPage = new DashboardPage();
    var defaultCredentials = 0;

    beforeAll(function() {
      console.log('AWS credential creation test setup has started!');
      dashboardPage.deleteCredential(newAWSName);
      dashboardPage.getBadgeValue(4).then(function (value) {
        defaultCredentials = value;
      });
    });

    it('Create new AWS credential', function () {
      dashboardPage.createAWSCredential(newAWSName, newDescription, iamRole, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toBeGreaterThan(defaultCredentials);
      });
    });
  });

  describe('with ' + newOSName + ' OpenStack credential', function () {
    dashboardPage = new DashboardPage();
    var defaultCredentials = 0;

    beforeAll(function() {
      console.log('OpenStack credential creation test setup has started!');
      dashboardPage.deleteCredential(newOSName);
      dashboardPage.getBadgeValue(4).then(function (value) {
        defaultCredentials = value;
      });
    });

    it('Create new OpenStack credential', function () {
      dashboardPage.createOSCredential(newOSName, newDescription, userOS, passwordOS, tenantOS, endpointOS, apiFacing, sshKey);
      dashboardPage.getBadgeValue(4).then(function (value) {
        expect(value).toBeGreaterThan(defaultCredentials);
      });
    });
  });
});