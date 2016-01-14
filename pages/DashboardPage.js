'use strict';

var DashboardPage = function () {
  browser.get('https://pre-prod-cloudbreak.sequenceiq.com/#/');
};

DashboardPage.prototype  = Object.create({}, {
  blueprintsexpandButton:  {   get: function ()  { return element(by.css('a#blueprints-btn i'));   }},

  expandBlueprints:        { value: function ()  {
    return this.blueprintsexpandButton.click();
  }},
  getBadgeValue:           { value: function (idx)  {
    return element.all(by.css('span.badge.pull-right.ng-binding')).get(idx).getText().then(function(value){
      return parseInt(value.trim(), 10);
    });
  }}
});

module.exports = DashboardPage;