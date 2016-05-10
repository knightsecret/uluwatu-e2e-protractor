ENVFILE=utils/testenv
TESTCONF=/protractor/project/e2e.conf.js

all:            build run

all-preprod:    build run-preprod

all-qa:         build run-qa

build:
				docker build -t sequenceiq/protractor-runner .

run-with-envfile:
				docker run -it \
				--rm \
				--name uluwatu-e2e-runner \
				--env-file $(ENVFILE) \
				-v $(PWD):/protractor/project \
				sequenceiq/protractor-runner

run:
				docker run -it \
				--rm \
				--name uluwatu-e2e-runner \
				-e BASE_URL=$(BASE_URL) \
				-e USERNAME=$(USERNAME) \
				-e PASSWORD=$(PASSWORD) \
				-e IAMROLE=$(IAMROLE) \
				-e SSHKEY=$(SSHKEY) \
				-e TESTCONF=$(TESTCONF) \
				-v $(PWD):/protractor/project \
				sequenceiq/protractor-runner

run-preprod:
				docker run -i \
				--rm \
				--name uluwatu-e2e-preprod \
				-e BASE_URL=$(BASE_URL) \
				-e USERNAME=$(USERNAME) \
				-e PASSWORD=$(PASSWORD) \
				-e IAMROLE=$(IAMROLE) \
				-e SSHKEY=$(SSHKEY) \
				-e TESTCONF=$(TESTCONF) \
				-v $(PWD):/protractor/project \
				sequenceiq/protractor-runner

run-qa:
				docker run -i \
				--rm \
				--name uluwatu-e2e-qa \
				-e BASE_URL=$(BASE_URL) \
				-e USERNAME=$(USERNAME) \
				-e PASSWORD=$(PASSWORD) \
				-e IAMROLE=$(IAMROLE) \
				-e SSHKEY=$(SSHKEY) \
				-e TESTCONF=$(TESTCONF) \
				-v $(PWD):/protractor/project \
				sequenceiq/protractor-runner

allure-report:
				allure generate allure-results/

allure-report-open:
				allure report open

.PHONY:
				all