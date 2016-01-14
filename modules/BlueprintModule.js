/**
 * Created by aszegedi on 1/14/16.
 */

'use strict';

var BlueprintModule = ( function () {
    this.newblueprintButton = element(by.css('a#panel-create-blueprints-collapse-btn'));
    this.nameBox = element(by.css('form[name=blueprintForm] input#name'));
    this.descriptionBox = element(by.css('form[name=blueprintForm] input#description'));
    this.urlBox = element(by.css('form[name=blueprintForm] input#url'));
    this.createButton = element(by.css('form[name=blueprintForm] a#createBlueprint'));

    this.typeName = function (keys) {
        return this.nameBox.sendKeys(keys);
    };

    this.typeDescription = function (keys) {
        return this.descriptionBox.sendKeys(keys);
    };

    this.typeUrl = function (keys) {
        return this.urlBox.sendKeys(keys);
    };

    this.createBlueprint = function (name, description, rawurl) {
        this.newblueprintButton.click();
        this.typeName(name);
        this.typeDescription(description);
        this.typeUrl(rawurl);
        this.createButton.click().then(function() {
            return browser.driver.wait(function () {
                return browser.element(by.xpath('//a[@class="ng-binding collapsed" and text()="' + name + '"]'));
            }, 20000);
        });
        browser.waitForAngular();
    };
});
module.exports = BlueprintModule;