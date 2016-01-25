/**
 * Created by elgalu and mcalthrop on 3/14/14
 * https://github.com/elgalu and https://github.com/mcalthrop
 * https://github.com/angular/protractor/issues/610#issuecomment-37659676
 * https://github.com/angular/protractor/issues/543
 */
var WaitForUtils = ( function () {

    this.isWarningDisplayed = function (expectedVisibility) {
        return browser.driver.wait(function () {
            if (expectedVisibility) {
                return element(by.css('.warning')).isDisplayed().then(function(visibility) {
                    return visibility === expectedVisibility;
                });
            } else {
                return element.all(by.css('.warning .collapse.in')).then(function(items) {
                    return items.length === 0;
                });
            }
        }, 20000).then(function() {
            return element.all(by.css('.warning .collapse.in'));
        }).then(function (items) {
            return items.length > 0;
        });
    };

    this.waitForElementCSS = function (csslocator, attempts) {
        browser.driver.ignoreSynchronization = true;
        var EC = protractor.ExpectedConditions;
        browser.driver.manage().timeouts().implicitlyWait(20000);
        if (attempts == null) attempts = 3;
        var whatWeWaitFor = browser.element(by.css(csslocator));

        var looping = function (idx) {
            return browser.driver.wait(EC.visibilityOf(whatWeWaitFor), 20000, 'The element ' + csslocator + ' is NOT visible! first').then(function() {
                console.log('The element ' + csslocator + ' is visible!');
                return browser.element(by.css(csslocator)).isDisplayed();
            }, function(err) {
                console.log('The element ' + csslocator + ' is NOT visible! second');
                if (idx > 0) {
                    browser.driver.sleep(30000);
                    return looping(idx - 1);
                } else {
                    console.log('The element ' + csslocator + ' is NOT visible! in ' + idx.toString() + ' attempts!');
                    browser.driver.ignoreSynchronization = false;
                    return browser.element(by.css(csslocator)).isDisplayed();
                }
            });
        }
        return looping(attempts);
    };

});

module.exports = WaitForUtils;