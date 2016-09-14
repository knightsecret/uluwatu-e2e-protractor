'use strict';

var DashboardPage = require('../pages/DashboardPage.js');

describe('Testing template creation', function () {
  var dashboardPage;
  var newName = 'autotest-kilo-tmp';
  var newDescription = 'autotest';
  var newInstanceType = 'm1.medium';
  var newAttachedVolumes = '1';
  var newVolumeSize = '100';

  describe('with ' + newName + ' template', function () {
    dashboardPage = new DashboardPage();
    var defaultTemplates = 0;

    beforeAll(function() {
      console.log('Template creation test setup has started!');
      dashboardPage.deleteTemplate(newName);
      dashboardPage.getBadgeValue(2).then(function (value) {
          defaultTemplates = value;
      });
    });

    it('Default templates should be available', function () {
      expect(dashboardPage.getDefaultTemplates).toBeTruthy();
    });

    it('Create new OpenStack template', function () {
      dashboardPage.createOSTemplate(newName, newDescription, newInstanceType, newAttachedVolumes, newVolumeSize);
      dashboardPage.getBadgeValue(2).then(function (value) {
        expect(value).toBeGreaterThan(defaultTemplates);
      });
    });
  });
});