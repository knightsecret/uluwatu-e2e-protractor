/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */
var WaitForUtils = ( function () {

    this.waitForElementWithAttribute = function (csslocator, attribute, attempts) {
        if (attempts == null) {
            attempts = 3;
        }

        return browser.driver.findElement(by.css(csslocator)).then(function(found) {
            browser.driver.manage().timeouts().implicitlyWait(10000);
            return browser.wait(function() {
                return found.isDisplayed().then(function(visible) {
                    if (visible) {
                        return found.getAttribute(attribute).then(function(gotAttribute) {
                            return gotAttribute === attribute;
                        });
                    } else {
                        browser.sleep(10000);
                        return false;
                    }
                }, function(err) {
                    if (attempts > 0) {
                        return this.waitForElementWithAttribute(csslocator, attribute, attempts - 1);
                    } else {
                        throw err;
                    }
                });
                browser.manage().timeouts().implicitlyWait(browser.params.timeouts.implicitlyWait);
            }, 20000, function(err) {
                if (attempts > 0) {
                    return this.waitForElementWithAttribute(csslocator, attribute, attempts - 1);
                } else {
                    throw err;
                }
            });
        });
    };

});

module.exports = WaitForUtils;