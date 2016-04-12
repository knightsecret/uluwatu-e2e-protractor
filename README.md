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
If your Protractor test environment has not set up, you should install every needed package and tool first. 

You can use `npm install` to install everything for this project in one round; please check the [npm-install](https://docs.npmjs.com/cli/install) documentation. Besides these please check the [Protractor Tutorial](https://angular.github.io/protractor/#/tutorial) first.

You do not need to launch the `webdriver-manager` for these tests, because of the `directConnect` is `true` in the Protractor configuration. In this case the Protractor starts directly Chrome or Firefox and you do not need to start the WebDriver.

Execute the tests based on the configuration:
```
protractor e2e.conf.js
```
## Structure
![](utils/images/UluwatuPageObjects.png)

# Docker image for ULUWATU functional E2E test project

**Docker image for executing headless Google Chrome or Firefox Protractor e2e test cases in Docker container. The created image contains the latest javascript test project.**

The [Dockerfile](Dockerfile) was design based on the following Docker projects:
- [Protractor and headless Chrome on Docker](http://float-middle.com/protractor-and-headless-chrome-on-docker-with-video-tutorial/) or [Docker image of Protractor with headless Chrome](https://github.com/jciolek/docker-protractor-headless)
- [docker-protractor](https://github.com/School-Improvement-Network/docker-protractor)
- [Protractor-Firefox-Headless-Docker](https://github.com/cfalguiere/Protractor-Firefox-Headless-Docker)

## To run ULUWATU tests in this image

1. Clone this repository in a local folder then open it.
2. Provide valid and appropriate values for base test parameters in the [environment file](utils/testenv). The following variables should be set:
  - BASE_URL=`https://pre-prod-accounts.sequenceiq.com/`
  - USERNAME=`testing@something.com`
  - PASSWORD=`password`
  - IAMROLE=`arn:aws:iam::1234567890:role/userrole`
  - SSHKEY=`AAAAB3NzaC1+soon...etc.`
  - TESTCONF=`e2e.conf.js` here should add your e2e test configuration JS file name (for our project it is `e2e.conf.js`)
3. Build the [Docker image](https://docs.docker.com/engine/reference/commandline/build/#tag-image-t):
```
docker build -t sequenceiq/protractor-runner .
```
4. Execute the Protractor test configuration for ULUWATU in the [Docker container](https://docs.docker.com/engine/installation/):
```
docker run -it --rm --name uluwatu-e2e-runner --env-file utils/testenv sequenceiq/protractor-runner
```

  - `uluwatu-e2e-runner` name of the new Docker container (created from `sequenceiq/protractor-runner` Docker image)
  - `utils/testenv` the location (full path) of the `testenv` file on your machine
  - `sequenceiq/protractor-runner` previously built Docker image name

> You should apply all these commands in the root folder of the cloned `ULUWATU functional E2E tests` repository.

## Advanced options

### Protractor direct connect
Protractor can test directly against Chrome and Firefox [without using a Selenium Server](https://github.com/angular/protractor/blob/master/docs/server-setup.md#connecting-directly-to-browser-drivers). **The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster.** To use this, in your config file set:
```
directConnect: true
```
>**If this is true, settings for seleniumAddress and seleniumServerJar will be ignored.**

If you attempt to use a browser other than Chrome or Firefox an error will be thrown.

### No sandbox for Google Chrome
Chrome doesn't support [running it in container](https://github.com/travis-ci/travis-ci/issues/938#issuecomment-77785455). So you need to start it with `--no-sandbox` argument to avoid this. In the Protractor configuration file:
```
capabilities: {
     'browserName': 'chrome',
     /**
      * Chrome is not allowed to create a SUID sandbox when running inside Docker
      */
     'chromeOptions': {
         'args': ['no-sandbox']
     }
},
```

### Makefile
We created a very simple Makefile to be able build and run easily our Docker image:
```
make build
```
then
```
make run
```

### In-memory File System /dev/shm (Linux only)
Docker has hardcoded value of 64MB for `/dev/shm`. Error can be occurred, because of [page crash](https://bugs.chromium.org/p/chromedriver/issues/detail?id=1097) on memory intensive pages. The easiest way to mitigate the problem is share `/dev/shm` with the host.
```
docker run -it --rm --name uluwatu-e2e-runner --env-file utils/testenv -v /dev/shm:/dev/shm sequenceiq/protractor-runner
```
This needs to be done during Docker build gets the [option](https://github.com/docker/docker/issues/2606) `--shm-size`.

For Mac OSX users [this conversation](http://unix.stackexchange.com/questions/151984/how-do-you-move-files-into-the-in-memory-file-system-mounted-at-dev-shm) can be useful. 

<sub>Based on the [Webnicer project](https://hub.docker.com/r/webnicer/protractor-headless/).</sub> 

### --privileged
Chrome uses sandboxing, therefore if you try and run Chrome within a non-privileged container you will receive the following message:

> "Failed to move to new namespace: PID namespaces supported, Network namespace supported, but failed: errno = Operation not permitted".

The `--privileged` flag gives the container almost the same privileges to the host machine resources as other processes running outside the container, which is required for the sandboxing to run smoothly.

<sub>Based on the [Webnicer project](https://hub.docker.com/r/webnicer/protractor-headless/).</sub>

### --net=host
This options is required only if the dockerised Protractor is run against localhost on the host.

**Imagine this scenario:**
Run an http test server on your local machine, let's say on port 8000. You type in your browser http://localhost:8000 and everything goes smoothly. Then you want to run the dockerised Protractor against the same localhost:8000. If you don't use `--net=host` the container will receive the bridged interface and its own loopback and so the localhost within the container will refer to the container itself. Using `--net=host` you allow the container to share host's network stack and properly refer to the host when Protractor is run against localhost.

<sub>Based on the [Webnicer project](https://hub.docker.com/r/webnicer/protractor-headless/).</sub>
