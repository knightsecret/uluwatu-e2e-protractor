/**
 * Created by aszegedi on 1/14/16.
 *
 * Page Objects for the Manage Credentials pane on the Cloudbreak Dashboard.
 */

'use strict';

var CredentialModule = ( function () {
    this.newcredentialButton = element(by.css('a#panel-create-credentials-collapse-btn'));
    // Tab pages
    this.awsTab = element(by.css('a#awsChange'));
    this.azureTab = element(by.css('a#azureRmChange'));
    this.gcpTab = element(by.css('a#gcpChange'));
    this.openstackTab = element(by.css('a#openstackChange'));
    // AWS credential pane
    this.awscredentialForm = element(by.css('form[name=awsCredentialForm]'));
    this.awsnameBox = this.awscredentialForm.element(by.css('input#awscname'));
    this.awsdescriptionBox = this.awscredentialForm.element(by.css('input#awscdescription'));
    this.awsiamroleBox = this.awscredentialForm.element(by.css('input#croleArn'));
    this.awssshBox = this.awscredentialForm.element(by.css('textarea#aws_sshPublicKey'));
    this.awscreateButton = this.awscredentialForm.element(by.css('a#createAwsCredential'));
    // Azure credential pane
    this.azurecredentialForm = element(by.css('form[name=azureRmCredentialForm]'));
    this.azurenameBox = this.azurecredentialForm.element(by.css('form[name=azureRmCredentialForm] input#cname'));
    this.azuredescriptionBox = this.azurecredentialForm.element(by.css('input#cdescription'));
    this.azuresubscriptionBox = this.azurecredentialForm.element(by.css('input[id*=subscriptionId]'));
    this.azureappBox = this.azurecredentialForm.element(by.css('input[id*=accesKey]'));
    this.azurepasswordBox = this.azurecredentialForm.element(by.css('input[id*=secretKey]'));
    this.azuretenantBox = this.azurecredentialForm.element(by.css('input[id*=tenantId]'));
    this.azuresshBox = this.azurecredentialForm.element(by.css('textarea#azure_sshPublicKey'));
    this.azurecreateButton = this.azurecredentialForm.element(by.css('a#createAzureRmCredential'));
    // GCP credential pane
    this.gcpcredentialForm = element(by.css('form[name=gcpCredentialForm]'));
    this.gcpnameBox = this.gcpcredentialForm.element(by.css('input#gcpcname'));
    this.gcpdescriptionBox = this.gcpcredentialForm.element(by.css('input#gcpcdescription'));
    this.gcpprojectBox = this.gcpcredentialForm.element(by.css('input#gcp_tprojectId'));
    this.gcpemailBox = this.gcpcredentialForm.element(by.css('input#gcpcsubscriptionId'));
    this.gcpprivatekeyBox = this.gcpcredentialForm.element(by.css('input.ng-isolate-scope'));
    this.gcpsshBox = this.gcpcredentialForm.element(by.css('textarea#gcp_sshPublicKey'));
    this.gcpcreateButton = this.gcpcredentialForm.element(by.css('a#createGcpCredential'));
    // OpenStack
    this.openstackcredentialForm = element(by.css('form[name=openstackCredentialForm]'));
    this.openstacknameBox = this.openstackcredentialForm.element(by.css('input#openstackcname'));
    this.openstackdescriptionBox = this.openstackcredentialForm.element(by.css('input#openstackcdescription'));
    this.openstackuserBox = this.openstackcredentialForm.element(by.css('input#ouser'));
    this.openstackpasswordBox = this.openstackcredentialForm.element(by.css('input#opassword'));
    this.openstacktenantBox = this.openstackcredentialForm.element(by.css('input#otenantName'));
    this.openstackendpointBox = this.openstackcredentialForm.element(by.css('input#oendpoint'));
    this.openstacksshBox = this.openstackcredentialForm.element(by.css('textarea#openstack_sshPublicKey'));
    this.openstackcreateButton = this.openstackcredentialForm.element(by.css('a#createopenstackCredential'));

    this.typeName = function (provider, name) {
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
        };
    };

    this.typeDescription = function (provider, description) {
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
        };
    };

    this.typeSSHKey = function (provider, key) {
        switch (provider) {
            case 'AWS':
                return this.awssshBox.sendKeys('ssh-rsa ' + key);
                break;
            case 'Azure':
                return this.azuresshBox.sendKeys('ssh-rsa ' + key);
                break;
            case 'GCP':
                return this.gcpsshBox.sendKeys('ssh-rsa ' + key);
                break;
            case 'OpenStack':
                return this.openstacksshBox.sendKeys('ssh-rsa ' + key);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        };
    };

    this.clickCreateCredential = function (provider, newName) {
        switch (provider) {
            case 'AWS':
                this.awscreateButton.click().then(function() {
                    browser.waitForAngular();
                    return browser.driver.wait(function () {
                        return browser.element(by.cssContainingText('div>h5>a', newName)).isDisplayed();
                    }, 20000);
                });
                break;
            case 'Azure':
                this.azurecreateButton.click().then(function() {
                    browser.waitForAngular();
                    return browser.driver.wait(function () {
                        return browser.element(by.cssContainingText('div>h5>a', newName)).isDisplayed();
                    }, 20000);
                });
                break;
            case 'GCP':
                this.gcpcreateButton.click().then(function() {
                    browser.waitForAngular();
                    return browser.driver.wait(function () {
                        return browser.element(by.cssContainingText('div>h5>a', newName)).isDisplayed();
                    }, 20000);
                });
                break;
            case 'OpenStack':
                this.openstackcreateButton.click().then(function() {
                    browser.waitForAngular();
                    return browser.driver.wait(function () {
                        return browser.element(by.cssContainingText('div>h5>a', newName)).isDisplayed();
                    }, 20000);
                });
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        };
    };

    this.typePassword = function (provider, password) {
        switch (provider) {
            case 'Azure':
                return this.azurepasswordBox.sendKeys(password);
                break;
            case 'OpenStack':
                return this.openstackpasswordBox.sendKeys(password);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        };
    };

    this.typeTenantId = function (provider, id) {
        switch (provider) {
            case 'Azure':
                return this.azuretenantBox.sendKeys(id);
                break;
            case 'OpenStack':
                return this.openstacktenantBox.sendKeys(id);
                break;
            default:
                return this.throwError('Provider is not valid!');
                break;
        };
    };

    this.typeIAMRole = function (role) {
        return this.awsiamroleBox.sendKeys(role);
    };

    this.typeSubscriptionId = function (id) {
        return this.azuresubscriptionBox.sendKeys(id);
    };

    this.typeAppId = function (id) {
        return this.azureappBox.sendKeys(id);
    };

    this.typeProjectId = function (id) {
        return this.gcpprojectBox.sendKeys(id);
    };

    this.typeEmailAddress = function (email) {
        return this.gcpemailBox.sendKeys(email);
    };

    this.typeP12Key = function (keyPath) {
        // keyPath: /Users/aszegedi/Downloads/SequenceIQ Hadoop as a Service-3d802ef03fa2.p12
        return this.gcpprivatekeyBox.sendKeys(keyPath);
    };

    this.typeUser = function (user) {
        return this.openstackuserBox.sendKeys(user);
    };

    this.typeEndpoint = function (endpoint) {
        return this.openstackendpointBox.sendKeys(endpoint);
    };

    this.createAWSCredential = function (name, description, iamRole, sshKey) {
        this.newcredentialButton.click();
        this.awsTab.click();
        this.typeName('AWS', name);
        this.typeDescription('AWS', description);
        this.typeIAMRole(iamRole);
        this.typeSSHKey('AWS', sshKey);
        this.clickCreateCredential('AWS', name);
        browser.waitForAngular();
    };

    this.createAzureCredential = function (name, description, subscriptionID, appID, password, tenantID, sshKey) {
        this.newcredentialButton.click();
        this.azureTab.click();
        this.typeName('Azure', name);
        this.typeDescription('Azure', description);
        this.typeSubscriptionId(subscriptionID);
        this.typeAppId(appID);
        this.typePassword('Azure', password);
        this.typeTenantId('Azure', tenantID);
        this.typeSSHKey('Azure', sshKey);
        this.clickCreateCredential('Azure', name);
        browser.waitForAngular();
    };

    this.createGCPCredential = function (name, description, projectID, accountEmail, p12KeyPath, sshKey) {
        this.newcredentialButton.click();
        this.gcpTab.click();
        this.typeName('GCP', newName);
        this.typeDescription('GCP', newDescription);
        this.typeProjectId(projectID);
        this.typeEmailAddress(accountEmail);
        this.typeP12Key(p12KeyPath);
        this.typeSSHKey('GCP', sshKey);
        this.clickCreateCredential('GCP', name);
        browser.waitForAngular();
    };

    this.createOpenStackCredential = function (name, description, user, password, tenantName, endpoint, sshKey) {
        this.newcredentialButton.click();
        this.openstackTab.click();
        this.typeName('OpenStack', name);
        this.typeDescription('OpenStack', description);
        this.typeUser(user);
        this.typePassword('OpenStack', password);
        this.typeTenantId('OpenStack', tenantName);
        this.typeEndpoint(endpoint);
        this.typeSSHKey('OpenStack', sshKey);
        this.clickCreateCredential('OpenStack', name);
        browser.waitForAngular();
    };

    this.getCredentialID = function (name) {
        return browser.element(by.cssContainingText('div>h5>a', name)).getAttribute('data-target');
    };
});
module.exports = CredentialModule;