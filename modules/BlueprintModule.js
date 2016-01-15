/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for the Manage Blueprints pane on the Cloudbreak Dashboard.
 */

'use strict';

var BlueprintModule = ( function () {
    this.newblueprintButton = element(by.css('a#panel-create-blueprints-collapse-btn'));
    this.nameBox = element(by.css('form[name=blueprintForm] input#name'));
    this.descriptionBox = element(by.css('form[name=blueprintForm] input#description'));
    this.urlBox = element(by.css('form[name=blueprintForm] input#url'));
    this.createButton = element(by.css('form[name=blueprintForm] a#createBlueprint'));

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
                return browser.element(by.xpath('//a[text()="' + name + '"]'));
            }, 20000);
        });
        browser.waitForAngular();
    };
    this.getBlueprintID = function (name) {
        return browser.element(by.xpath('//a[text()="' + name + '"]')).getAttribute('data-target');
    };
});
module.exports = BlueprintModule;