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
    blueprintForm:                 {       get: function () {     return element(by.css('form[name=blueprintForm]'));                }},
    nameBox:                       {       get: function () {     return this.blueprintForm.element(by.css('input#name'));           }},
    descriptionBox:                {       get: function () {     return this.blueprintForm.element(by.css('input#description'));    }},
    sourceSelect:                  {       get: function () {     return this.blueprintForm.element(by.css('select#blueprinttype')); }},
    urlBox:                        {       get: function () {     return this.blueprintForm.element(by.css('input#url'));            }},
    createButton:                  {       get: function () {     return this.blueprintForm.element(by.css('a#createBlueprint'));    }},

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
            browser.element(by.cssContainingText('div>h5>a', name)).isDisplayed().then(function() {
                var blueprintLink = browser.element(by.cssContainingText('div>h5>a', name));
                blueprintLink.click();
                browser.waitForAngular();

                var selectedBlueprintPanel = browser.element(by.css('div[id^="panel-blueprint-collapse"][aria-expanded="true"]'));

                selectedBlueprintPanel.element(by.css('a[ng-click="deleteBlueprint(blueprint)"]')).click().then(function () {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var blueprintNotPresent = EC.stalenessOf(blueprintLink);
                    return browser.wait(blueprintNotPresent, 20000);
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
        this.newblueprintButton.click();
        this.typeName(name);
        this.typeDescription(description);
        this.selectSource('URL');
        this.typeUrl(rawurl);
        this.createButton.click().then(function () {
            return browser.driver.wait(function () {
                browser.waitForAngular();
                return browser.element(by.cssContainingText('div>h5>a', name)).isDisplayed();
            }, 20000);
        });
    }},
    getBlueprintID:                { value: function (name) {
        return browser.element(by.cssContainingText('div>h5>a', name)).getAttribute('data-target');
    }}
});
module.exports = BlueprintModule;