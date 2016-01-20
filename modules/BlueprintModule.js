/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for the Manage Blueprints pane on the Cloudbreak Dashboard.
 */

'use strict';

var BlueprintModule = ( function () {
    this.newblueprintButton = element(by.css('a#panel-create-blueprints-collapse-btn'));
    this.blueprintForm = element(by.css('form[name=blueprintForm]'));
    this.nameBox = this.blueprintForm.element(by.css('input#name'));
    this.descriptionBox = this.blueprintForm.element(by.css('input#description'));
    this.urlBox = this.blueprintForm.element(by.css('input#url'));
    this.createButton = this.blueprintForm.element(by.css('a#createBlueprint'));

    this.typeName = function (name) {
        return this.nameBox.sendKeys(name);
    };

    this.typeDescription = function (description) {
        return this.descriptionBox.sendKeys(description);
    };

    this.typeUrl = function (url) {
        return this.urlBox.sendKeys(url);
    };

    this.createBlueprint = function (name, description, rawurl) {
        this.newblueprintButton.click();
        this.typeName(name);
        this.typeDescription(description);
        this.typeUrl(rawurl);
        this.createButton.click().then(function() {
            return browser.driver.wait(function () {
                browser.waitForAngular();
                return browser.element(by.cssContainingText('div>h5>a', name)).isDisplayed();
            }, 20000);
        });
        browser.waitForAngular();
    };
    this.getBlueprintID = function (name) {
        return browser.element(by.cssContainingText('div>h5>a', name)).getAttribute('data-target');
    };
});
module.exports = BlueprintModule;