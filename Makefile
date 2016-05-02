all:
				build run

build:
				docker build -t sequenceiq/protractor-runner .

run:
				docker run -it --rm --name uluwatu-e2e-runner --env-file utils/testenv sequenceiq/protractor-runner

allure-report:
				allure generate allure-results/

allure-report-open:
				allure report open

.PHONY:
				all