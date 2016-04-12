all:
				build clean

build:
				docker build -t sequenceiq/protractor-runner .

run:
				docker run -it --rm --name uluwatu-e2e-runner --env-file utils/testenv sequenceiq/protractor-runner

.PHONY:
				all