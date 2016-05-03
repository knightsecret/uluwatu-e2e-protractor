ENVFILE=utils/testenv
TESTCONF=/protractor/project/e2e.conf.js

all: build run

build:
				docker build -t sequenceiq/protractor-runner .

run-with-envfile:
				docker run -it \
				--rm \
				--name uluwatu-e2e-runner \
				--env-file $(ENVFILE) \
				-v $(pwd):/protractor/project \
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
				-v $(pwd):/protractor/project \
				sequenceiq/protractor-runner

allure-report:
				allure generate allure-results/

allure-report-open:
				allure report open

.PHONY:
				all