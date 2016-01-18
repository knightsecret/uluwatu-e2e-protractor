/**
 * Slow downs the Browser steps execution.
 *
 * Created by aszegedi on 1/12/16.
 */
browser.driver.controlFlow().execute = function () {
    var args = arguments;
    var origFn = browser.driver.controlFlow().execute;

    origFn.call(browser.driver.controlFlow(), function () {
        //increase or reduce time value, its in millisecond
        return protractor.promise.delayed(500);
    });

    console.log('Flow is controlled.');

    return origFn.apply(browser.driver.controlFlow(), args);
};