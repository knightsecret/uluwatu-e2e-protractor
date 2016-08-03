/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for the Manage Blueprints pane on the Cloudbreak Dashboard.
 */

'use strict';

var BlueprintModule = function () {
    this.managementSection = element(by.css('section.management-panels'));
    this.newblueprintButton = element(by.css('a#panel-create-blueprints-collapse-btn'));
};

BlueprintModule.prototype = Object.create({}, {
    blueprintForm:                 { get: function () {     return element(by.css('form[name=blueprintForm]'));                }},
    nameBox:                       { get: function () {     return this.blueprintForm.element(by.css('input#name'));           }},
    descriptionBox:                { get: function () {     return this.blueprintForm.element(by.css('input#description'));    }},
    sourceSelect:                  { get: function () {     return this.blueprintForm.element(by.css('select#blueprinttype')); }},
    urlBox:                        { get: function () {     return this.blueprintForm.element(by.css('input#url'));            }},
    createButton:                  { get: function () {     return this.blueprintForm.element(by.css('a#createBlueprint'));    }},

    typeName:                      { value: function (name)  {
        return this.nameBox.sendKeys(name);
    }},
    typeDescription:               { value: function (description) {
        return this.descriptionBox.sendKeys(description);
    }},
    selectSource:                  { value: function (name) {
        return this.sourceSelect.element(by.cssContainingText('option', name)).click();
    }},
    typeUrl:                       { value: function (url) {
        return this.urlBox.sendKeys(url);
    }},
    deleteBlueprint:               { value: function (name) {
        try {
            element(by.cssContainingText('div>h5>a', name)).isDisplayed().then(function(isDisplayed) {
                var blueprintLink = element(by.cssContainingText('div>h5>a', name));
                blueprintLink.click();
                browser.waitForAngular();

                var selectedBlueprintPanel = element(by.css('div[id^="panel-blueprint-collapse"][aria-expanded="true"]'));

                selectedBlueprintPanel.element(by.css('a[ng-click="deleteBlueprint(blueprint)"]')).click().then(function () {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var blueprintNotPresent = EC.stalenessOf(blueprintLink);
                    return browser.driver.wait(blueprintNotPresent, 20000);
                });
            }, function(err) {
                console.log('The blueprint with ' + name + ' name is not present!');
            });
        } catch(err) {
            console.log('An error was thrown during delete blueprint ' + name + ': ' + err);
        }
    }},
    createBlueprint:               { value: function (name, description, rawurl) {
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        var newBlueprint = element(by.cssContainingText('div>h5>a', name));
        var notificationBar = element(by.css('input#notification-n-filtering'));

        this.newblueprintButton.click();
        this.typeName(name);
        this.typeDescription(description);
        this.selectSource('Url');
        this.typeUrl(rawurl);
        this.createButton.click().then(function () {
            browser.waitForAngular();
            return browser.driver.wait(EC.visibilityOf(newBlueprint), 20000, 'The ' + name + ' blueprint has NOT created!').then(function() {
                return newBlueprint.isDisplayed().then(function(isDisplayed) {
                    notificationBar.getAttribute('value').then(function(message){
                        console.log(message);
                    });
                    return isDisplayed;
                }, function(err) {
                    return false;
                });
            }, function(err) {
                console.log('The ' + name + ' blueprint has NOT created!');
                return err;
            });
        });
    }},
    getBlueprintID:                { value: function (name) {
        return element(by.cssContainingText('div>h5>a', name)).getAttribute('data-target');
    }},
    isDefaultBlueprintAvailable:   { value: function () {
        var blueprintList = element(by.css('div#blueprint-list-accordion'));
        return blueprintList.$$(by.css('i.fa.fa-users.fa-lg.public-account-info.pull-right')).count > 1;
    }}
});
module.exports = BlueprintModule;