'use strict';

var NetworkModule = function () {
    browser.waitForAngular();
    browser.driver.wait(function() {
        return browser.driver.findElement(by.id('panel-network-collapse')).isDisplayed().then(function(displayed) {
            return displayed;
        });
    }, 5000);
};

NetworkModule.prototype = Object.create({}, {
    // Tab pages
    awsTab:                                 { get: function () {      return element(by.css('a#awsNetworkChange'));                                          }},
    azureTab:                               { get: function () {      return element(by.css('a#azureNetworkChange'));                                        }},
    gcpTab:                                 { get: function () {      return element(by.css('a#gcpNetworkChange'));                                          }},
    openstackTab:                           { get: function () {      return element(by.css('a#openstackNetworkChange'));                                    }},
    // AWS network pane
    awsnetworkForm:                         { get: function () {      return element(by.css('form[name=awsNetworkForm]'));                                   }},
    awsnameBox:                             { get: function () {      return this.awsnetworkForm.element(by.css('input#aws_networkName'));                   }},
    awsdescriptionBox:                      { get: function () {      return this.awsnetworkForm.element(by.css('input#aws_networkDescription'));            }},
    awssubnetBox:                           { get: function () {      return this.awsnetworkForm.element(by.css('input#aws_networkSubnet'));                 }},
    awscreateButton:                        { get: function () {      return this.awsnetworkForm.element(by.css('a#createAwsTemplate'));                     }},
    // Azure network pane
    azurenetworkForm:                       { get: function () {      return element(by.css('form[name=azureNetworkForm]'));                                 }},
    azurenameBox:                           { get: function () {      return this.azurenetworkForm.element(by.css('input#azure_networkName'));               }},
    azuredescriptionBox:                    { get: function () {      return this.azurenetworkForm.element(by.css('input#azure_networkDescription'));        }},
    azuresubnetBox:                         { get: function () {      return this.azurenetworkForm.element(by.css('input#azure_networkSubnet'));             }},
    azurecreateButton:                      { get: function () {      return  this.azurenetworkForm.element(by.css('a#createAwsTemplate'));                  }},
    // GCP network pane
    gcpnetworkForm:                         { get: function () {      return element(by.css('form[name=gcpNetworkForm]'));                                   }},
    gcpnameBox:                             { get: function () {      return this.gcpnetworkForm.element(by.css('input#gcp_networkName'));                   }},
    gcpdescriptionBox:                      { get: function () {      return this.gcpnetworkForm.element(by.css('input#gcp_networkDescription'));            }},
    gcpsubnetBox:                           { get: function () {      return this.gcpnetworkForm.element(by.css('input#gcp_networkSubnet'));                 }},
    gcpcreateButton:                        { get: function () {      return  this.gcpnetworkForm.element(by.css('a#createGcpNetwork_1'));                   }},
    // OpenStack
    openstacknetworkForm:                   { get: function () {      return element(by.css('form[name=openstackNetworkForm]'));                             }},
    openstackExSubExVPC:                    { get: function () {      return element(by.css('form[name="openStackNetworkForm_3"]'));                         }},
    openstacknameBox:                       { get: function () {      return this.openstackExSubExVPC.element(by.css('input#openstack_networkName'));        }},
    openstackdescriptionBox:                { get: function () {      return this.openstackExSubExVPC.element(by.css('input#openstack_networkDescription')); }},
    openstackfloatingBox:                   { get: function () {      return this.openstackExSubExVPC.element(by.css('input#openstack_publicNetId'));        }},
    openstackvirtualNetBox:                 { get: function () {      return this.openstackExSubExVPC.element(by.css('input#openstack_networkVPCId'));       }},
    openstacksubnetBox:                     { get: function () {      return this.openstackExSubExVPC.element(by.css('input#openstack_networkSubnetId'));    }},
    openstackcreateButton:                  { get: function () {      return  this.openstackExSubExVPC.element(by.css('a#createAwsTemplate'));               }},

    openCreatePanel:                        { value: function () {
        var EC = protractor.ExpectedConditions;
        var createButton = element(by.cssContainingText('a#panel-create-network-collapse-btn', 'create network'));
        var closeButton = element(by.cssContainingText('a#panel-create-network-collapse-btn[aria-expanded="true"]', 'create network'));

        // We need to fix the GUI here. Something goes wrong with Angular here.
        return browser.driver.wait(EC.elementToBeClickable(createButton), 5000, 'Create button is NOT click able!').then(function() {
        //    console.log('Create button is clicked 1st!');
            return browser.driver.actions().doubleClick(createButton).perform();
        }).then(function() {
            return browser.driver.wait(EC.elementToBeClickable(closeButton), 5000, 'Create button has NOT clicked at 1st!').then(function() {
            //    console.log('Create button has already clicked at 1st!');
            }, function(err) {
            //    console.log('Create button is clicked 2nd!');
                return browser.driver.actions().click(createButton).perform();
            });
        });
    }},
    expandExistingSubNetExistingNetwork:    { value: function () {
        var EC = protractor.ExpectedConditions;
        var expandButton = element(by.cssContainingText('a[aria-controls="openstack-net-collapseThree"]', 'Use an existing subnet in an existing network'));

        return browser.driver.wait(EC.elementToBeClickable(expandButton), 5000, 'Use an existing subnet in an existing network button is NOT click able!').then(function() {
            return expandButton.click();
        });
    }},
    typeName:                               { value: function (provider, name) {
        switch (provider) {
            case 'AWS':
                return this.awsnameBox.sendKeys(name);
                break;
            case 'Azure':
                return this.azurenameBox.sendKeys(name);
                break;
            case 'GCP':
                return this.gcpnameBox.sendKeys(name);
                break;
            case 'OpenStack':
                return this.openstacknameBox.sendKeys(name);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        }
    }},
    typeDescription:                        { value: function (provider, description) {
        switch (provider) {
            case 'AWS':
                return this.awsdescriptionBox.sendKeys(description);
                break;
            case 'Azure':
                return this.azuredescriptionBox.sendKeys(description);
                break;
            case 'GCP':
                return this.gcpdescriptionBox.sendKeys(description);
                break;
            case 'OpenStack':
                return this.openstackdescriptionBox.sendKeys(description);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        }
    }},
    typeSubnet:                             { value: function (provider, subnet) {
        switch (provider) {
            case 'AWS':
                return this.awssubnetBox.sendKeys(subnet);
                break;
            case 'Azure':
                return this.azuresubnetBox.sendKeys(subnet);
                break;
            case 'GCP':
                return this.gcpsubnetBox.sendKeys(subnet);
                break;
            case 'OpenStack':
                return this.openstacksubnetBox.sendKeys(subnet);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        }
    }},
    typeFloatingID:                         { value: function (networkID) {
        return this.openstackfloatingBox.sendKeys(networkID);
    }},
    clickCreateNetwork:                     { value: function (provider, name) {
        var notificationBar = element(by.css('input#notification-n-filtering'));

        switch (provider) {
            case 'AWS':
                this.awscreateButton.click().then(function() {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var newNetwork = element(by.cssContainingText('div>h5>a', name));

                    return browser.driver.wait(EC.visibilityOf(newNetwork), 20000, 'The ' + name + ' network has NOT created!').then(function() {
                        return newNetwork.isDisplayed().then(function(isDisplayed) {
                            notificationBar.getAttribute('value').then(function(message){
                                console.log(message);
                            });
                            return isDisplayed;
                        }, function(err) {
                            return false;
                        });
                    }, function(err) {
                        console.log('The ' + name + ' network has NOT created!');
                        return err;
                    });
                });
                break;
            case 'Azure':
                this.azurecreateButton.click().then(function() {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var newNetwork = element(by.cssContainingText('div>h5>a', name));

                    return browser.driver.wait(EC.visibilityOf(newNetwork), 20000, 'The ' + name + ' network has NOT created!').then(function() {
                        return newNetwork.isDisplayed().then(function(isDisplayed) {
                            notificationBar.getAttribute('value').then(function(message){
                                console.log(message);
                            });
                            return isDisplayed;
                        }, function(err) {
                            return false;
                        });
                    }, function(err) {
                        console.log('The ' + name + ' network has NOT created!');
                        return err;
                    });
                });
                break;
            case 'GCP':
                this.gcpcreateButton.click().then(function() {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var newNetwork = element(by.cssContainingText('div>h5>a', name));

                    return browser.driver.wait(EC.visibilityOf(newNetwork), 20000, 'The ' + name + ' network has NOT created!').then(function() {
                        return newNetwork.isDisplayed().then(function(isDisplayed) {
                            notificationBar.getAttribute('value').then(function(message){
                                console.log(message);
                            });
                            return isDisplayed;
                        }, function(err) {
                            return false;
                        });
                    }, function(err) {
                        console.log('The ' + name + ' network has NOT created!');
                        return err;
                    });
                });
                break;
            case 'OpenStack':
                this.openstackcreateButton.click().then(function() {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var newNetwork = element(by.cssContainingText('div>h5>a', name));

                    return browser.driver.wait(EC.visibilityOf(newNetwork), 20000, 'The ' + name + ' network has NOT created!').then(function() {
                        return newNetwork.isDisplayed().then(function(isDisplayed) {
                            notificationBar.getAttribute('value').then(function(message){
                                console.log(message);
                            });
                            return isDisplayed;
                        }, function(err) {
                            return false;
                        });
                    }, function(err) {
                        console.log('The ' + name + ' network has NOT created!');
                        return err;
                    });
                });
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        }
    }},
    deleteNetwork:                          { value: function (name) {
        try {
            browser.element(by.cssContainingText('div>h5>a', name)).isDisplayed().then(function() {
                browser.element(by.cssContainingText('div>h5>a', name)).click();
                browser.waitForAngular();

                var selectedNetworkPanel = browser.element(by.css('.panel.panel-default.ng-scope div[id^="panel-network-collapse"][aria-expanded="true"]'));

                selectedNetworkPanel.element(by.css('a[ng-click="deleteNetwork(network)"]')).click().then(function () {
                    browser.waitForAngular();
                    var EC = protractor.ExpectedConditions;
                    var networkName = browser.element(by.cssContainingText('div>h5>a', name));
                    var networkNotPresent = EC.stalenessOf(networkName);
                    return browser.wait(networkNotPresent, 20000);
                });
            }, function(err) {
                console.log('The network with ' + name + ' name is not present!');
            });
        } catch(err) {
            console.log('An error was thrown during delete network ' + name + ': ' + err);
        }
    }},
    createAWSNetwork:                       { value: function (name, description, subnetCIDR) {
        this.openCreatePanel();
        this.awsTab.click();
        this.typeName('AWS', name);
        this.typeDescription('AWS', description);
        this.typeSubnet('AWS', subnetCIDR);
        this.clickCreateNetwork('AWS', name);
        browser.waitForAngular();
    }},
    createAzureNetwork:                     { value: function (name, description, subnetCIDR) {
        this.openCreatePanel();
        this.azureTab.click();
        this.typeName('Azure', name);
        this.typeDescription('Azure', description);
        this.typeSubnet('Azure', subnetCIDR);
        this.clickCreateNetwork('Azure', name);
        browser.waitForAngular();
    }},
    createGCPNetwork:                       { value: function (name, description, subnetCIDR) {
        this.openCreatePanel();
        this.gcpTab.click();
        this.typeName('GCP', name);
        this.typeDescription('GCP', description);
        this.typeSubnet('GCP', subnetCIDR);
        this.clickCreateNetwork('GCP', name);
        browser.waitForAngular();
    }},
    createOpenStackNetwork:                 { value: function (name, description, virtualNetworkID, subnetCIDR) {
        this.openCreatePanel();
        this.openstackTab.click();
        this.expandExistingSubNetExistingNetwork();
        this.typeName('OpenStack', name);
        this.typeDescription('OpenStack', description);
        this.openstackvirtualNetBox.sendKeys(virtualNetworkID);
        this.typeSubnet('OpenStack', subnetCIDR);
        this.clickCreateNetwork('OpenStack', name);
        browser.waitForAngular();
    }},
    getNetworkID:                           { value: function (name) {
        return browser.element(by.cssContainingText('div>h5>a', name)).getAttribute('data-target');
    }},
    isDefaultNetworkAvailable:              { value: function () {
        var networkList = element(by.css('div#panel-network-collapse div#templete-list-accordion'));
        return networkList.$$(by.css('i.fa.fa-users.fa-lg.public-account-info.pull-right')).count > 1;
    }}
});
module.exports = NetworkModule;