require('jasmine-reporters');
require('jasmine-spec-reporter');
require('protractor-jasmine2-html-reporter');
require('protractor-html-screenshot-reporter');

/**
 * Base configurations for the Uluwatu E2E Protractor tests.
 *
 * @type {{seleniumAddress: string, capabilities: {browserName: string}, specs: string[], framework: string, jasmineNodeOpts: {onComplete: null, showColors: boolean, includeStackTrace: boolean, isVerbose: boolean, defaultTimeoutInterval: number}, baseUrl: *, onPrepare: exports.config.onPrepare}}
 */
exports.config = {
  //The address of the running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //Capabilities to be passed to the WebDriverJS instance.
  capabilities: { 'browserName': 'firefox' },

  /**
   * Specify the name of the specs files.
   * Note: The spec patterns are relative to the root directory (app parent dir)!
   */
  specs: [
      //'utils/slowdown.conf.js',
      'tests/LoginSpec.js',
      'tests/BlueprintSpec.js',
      'tests/CredentialSpec.js',
      'tests/ClusterSpec.js'
  ],
  /**
   * Define suits with the name of the Spec patterns.
   * Note: The spec patterns are relative to this directory (where the configuration file is)!
   *
  suites: {
      login: ['./tests/LoginSpec.js'],
      blueprint: ['./tests/BlueprintSpec.js']
  },
  */

  /**
   * Jasmine is a behavior-driven development framework for testing JavaScript code.
   * It does not depend on any other JavaScript frameworks.
   */
  framework: 'jasmine2',
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
      onComplete: null,
      // Print colors to the terminal.
      showColors: true,
      //invertGrep: false,
      // print: function() {},
      includeStackTrace: true,
      isVerbose: true,
      // Default waiting time in ms before test fails.
      defaultTimeoutInterval: 50000
  },

  /**
   * Base URL for the Cloudbreak.
   * BASE_URL is environment variable.
   */
  baseUrl: process.env.BASE_URL,

  /**
   * Protractor starts directly Chrome or Firefox. Do not need to start the WebDriver.
   */
  directConnect: true,

  onPrepare: function() {
      // WebDriver general settings for browsers.
      browser.driver.manage().deleteAllCookies();
      browser.driver.manage().window().maximize();
      browser.driver.manage().timeouts().implicitlyWait(10000);
      browser.driver.manage().timeouts().pageLoadTimeout(10000);
      // Open the base URL.
      browser.driver.get(browser.baseUrl);
      // Login to the Cloudbreak then check the redirected URL.
      browser.driver.findElement(by.id('email')).sendKeys(process.env.USERNAME);
      browser.driver.findElement(by.id('password')).sendKeys(process.env.PASSWORD);
      browser.driver.findElement(by.id('login-btn')).click().then(function() {
          return browser.driver.wait(function() {
              return browser.driver.getCurrentUrl().then(function(url) {
                  console.log(url);
                  return /dashboard/.test(url);
              });
          }, 10000);
      });

      browser.driver.findElement(by.id('login-btn')).click().then(function() {
          return browser.driver.wait(function() {
              return browser.driver.getCurrentUrl().then(function(url) {
                  console.log(url);
                  return /#/.test(url);
              });
          }, 10000);
      });
      // Waiting for Angular on the Cloudbreak Dashboard page.
      browser.waitForAngular();
      // It genereates JUnit XML report for test run.
      var jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
          savePath: './test-results/jasmine-reports',
          filePrefix: 'junitReport',
          consolidateAll:true
      }));
      // Format the Console test result report.
      var SpecReporter = require('jasmine-spec-reporter');
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'spec'}));
      // The following two generate HTML reports for the test run. In case of failure these save screenshot about the related page.
      // https://github.com/jintoppy/protractor-html-screenshot-reporter/issues/74
      var HtmlReporter = require('protractor-html-screenshot-reporter');
      jasmine.getEnv().addReporter(new HtmlReporter({
          baseDirectory: './test-results/protractor-reports',
          docTitle: 'protractor report',
          docName: 'protractorReport.html',
          takeScreenShotsOnlyForFailedSpecs: true
      }));
      var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
      jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
          savePath: './test-results/jasmine-reports',
          filePrefix: 'htmlReport',
          takeScreenshots: true,
          takeScreenshotsOnlyOnFailures: true
      }));
  }
};
