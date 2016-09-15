'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing blueprint creation', function () {
  var dashboardPage;
  var newAWSName = 'autotest-multi-' + browser.params.nameTag;
  var newOSName = 'autotest-scaling-'  + browser.params.nameTag;
  var newDescription = 'autotest';
  var newAWSUrl = 'https://raw.githubusercontent.com/sequenceiq/uluwatu-e2e-protractor/master/blueprints/multi-node-hdfs-yarn.bp';
  var newOSUrl = 'https://raw.githubusercontent.com/sequenceiq/uluwatu-e2e-protractor/master/blueprints/scaling-node-hdfs-yarn.bp';

  describe('with ' + newAWSName + ' HDP 2.5 blueprint', function () {
    dashboardPage = new DashboardPage();
    var defaultBlueprints = 0;

    beforeAll(function() {
      console.log('HDP 2.5 blueprint creation test setup has started!');
      dashboardPage.deleteBlueprint(newAWSName);
      dashboardPage.getBadgeValue(3).then(function (value) {
        defaultBlueprints = value;
      });
    });

    it('Default blueprints should be available', function () {
      expect(dashboardPage.getDefaultBlueprints).toBeTruthy();
    });

    it('Create new HDP 2.5 blueprint', function () {
      dashboardPage.createBlueprint(newAWSName, newDescription, newAWSUrl);
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toBeGreaterThan(defaultBlueprints);
      });
    });
  });

  describe('with ' + newOSName + ' custom blueprint', function () {
    dashboardPage = new DashboardPage();
    var defaultBlueprints = 0;

    beforeAll(function() {
      console.log('Custom blueprint creation test setup has started!');
      dashboardPage.deleteBlueprint(newOSName);
      dashboardPage.getBadgeValue(3).then(function (value) {
        defaultBlueprints = value;
      });
    });

    it('Default blueprints should be available', function () {
      expect(dashboardPage.getDefaultBlueprints).toBeTruthy();
    });

    it('Create new custom blueprint', function () {
      dashboardPage.createBlueprint(newOSName, newDescription, newOSUrl);
      dashboardPage.getBadgeValue(3).then(function (value) {
        expect(value).toBeGreaterThan(defaultBlueprints);
      });
    });
  });

});