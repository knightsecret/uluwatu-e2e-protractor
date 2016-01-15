# ULUWATU functional E2E tests (Protractor, Jasmine)
## Description
Cloudbreak web application functional smoke test project.

## Technology stack
- [Protractor](https://angular.github.io/protractor/#/api)
  - [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
  - [NodeJS](https://nodejs.org/api/)
- [Jasmine](http://jasmine.github.io/)

## Prerequisites
The following environment variables should be present with valid values:
- BASE_URL
- USERNAME
- PASSWORD
- IAMROLE
- SSHKEY

> For OS X Yosemite users with IntelliJ IDEA: You should add the required environment variables to your
`bash_profile` to can run tests directly form IDEA with no issues.
The file should contain the variables as:
```
export BASE_URL=your.url
launchctl setenv BASE_URL $BASE_URL
export USERNAME=your@mail.address
launchctl setenv USERNAME $USERNAME
export PASSWORD=your.password
launchctl setenv PASSWORD $PASSWORD
export IAMROLE=arn:aws:iam::1234567890:role/rolename
launchctl setenv IAMROLE $IAMROLE
export SSHKEY=AGab6CB4MUzsqF7vGTF/XU5pYXFUBhi8xzey+37QCKp3+mCqjFzPyQQmIVWpofpjT7BfcCxH877RzC5YMIi65aBc82Dl6tH6OEiP7
launchctl setenv SSHKEY $SSHKEY
```
Please do not forget you should reopen your project and restart your IDEA.

## Executing tests
If your Protractor test environment has not set up, please check the [Protractor Tutorial](https://angular.github.io/protractor/#/tutorial) first.

Launch WebDriver before start testing:
```
webdriver-manager start
```

Execute the tests based on the configuration:
```
protractor e2e.conf.js
```