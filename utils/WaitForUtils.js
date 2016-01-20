/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */
var WaitForUtils = ( function () {

    this.waitForElementWithCSS = function (csslocator, attribute, attempts) {
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
                        return waitForElementWithCSS(csslocator, attribute, attempts - 1);
                    } else {
                        throw err;
                    }
                });
                browser.manage().timeouts().implicitlyWait(browser.params.timeouts.implicitlyWait);
            }, 20000, function(err) {
                if (attempts > 0) {
                    return waitForElementWithCSS(csslocator, attribute, attempts - 1);
                } else {
                    throw err;
                }
            });
        });
    };

    this.waitForElementWithText = function(elm, txt, attempts) {
        if (attempts == null) {
            attempts = 3;
        }

        // first wait for element to be present
        return browser.driver.findElement(elm).then(function(found) {
            // now wait for it to be visible
            browser.manage().timeouts().implicitlyWait(5000); // we need this to be faster now
            return browser.driver.wait(function() {
                return found.isDisplayed().then(function(visible) {
                    // First wait for it to become visible
                    if (visible) {
                        // Then wait for text to be populated
                        return found.getText().then(function(gotTxt) {
                            return gotTxt === txt;
                        });
                    } else {
                        browser.sleep(5000); // give it a break
                        return false;
                    }
                }, function(err) { /* err hnd */
                    if (attempts > 0) {
                        return waitForElementWithText(elm, txt, attempts - 1);
                    } else {
                        throw err;
                    }
                });
            }, browser.params.timeouts.waitBecomeVisible, 'Expectation error: waiting for element to getText(): '+elm);
            // restore implicit wait
            browser.manage().timeouts().implicitlyWait(browser.params.timeouts.implicitlyWait);
        }, function(err) { /* err hnd */
            if (attempts > 0) {
                return waitForElementWithText(elm, txt, attempts - 1);
            } else {
                throw err;
            }
        });
    };
});

module.exports = WaitForUtils;