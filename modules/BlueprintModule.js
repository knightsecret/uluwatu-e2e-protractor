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
    createBlueprint:               { value: function (name, description, rawurl) {
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