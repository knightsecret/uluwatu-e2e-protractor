/**
 * Slow downs the Browser steps execution.
 *
 * Created by aszegedi on 1/12/16.
 */
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    var args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
        //increase or reduce time value, its in millisecond
        return protractor.promise.delayed(200);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};