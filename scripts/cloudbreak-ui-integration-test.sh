#!/bin/bash -x
# -e  Exit immediately if a command exits with a non-zero status.
# -x  Print commands and their arguments as they are executed.
: ${ENVFILE:?"Please provide env file"}
: ${TARGET_CBD_VERSION:?"Please provide TARGET_CBD_VERSION"}
: ${TEST_SUITE:?"Please provide TEST_SUITE"}

export NOWDATE=$(ssh -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST date +%Y-%m-%d"T"%H:%M:%S)
export TESTCONF=/protractor/project/e2e.conf.js

echo "CBD version: " $TARGET_CBD_VERSION

echo "Refresh the Test Runner Docker image"
docker pull hortonworks/docker-e2e-protractor

export TEST_CONTAINER_NAME=uluwatu-e2e-$ENVIRONMENT

echo "Checking stopped containers"
if [[ -n "$(docker ps -a -f status=exited -f status=dead -q)" ]]; then
  echo "Delete stopped containers"
  docker rm $(docker ps -a -f status=exited -f status=dead -q)
else
  echo "There is no Exited or Dead container"
fi

echo "Checking " $TEST_CONTAINER_NAME " container is running"
if [[ "$(docker inspect -f {{.State.Running}} $TEST_CONTAINER_NAME 2> /dev/null)" == "true" ]]; then
  echo "Delete the running " $TEST_CONTAINER_NAME " container"
  docker rm -f $TEST_CONTAINER_NAME
fi

BASE_URL_RESPONSE=$(curl -k --write-out %{http_code} --silent --output /dev/null https://$HOST/sl)
echo $HOST " HTTP status code is: " $BASE_URL_RESPONSE
if [[ $BASE_URL_RESPONSE -ne 200 ]]; then
    echo $HOST " Web GUI is not accessible!"
    RESULT=1
else
    docker run -i \
    --privileged \
    --rm \
    --name $TEST_CONTAINER_NAME \
    -e HOST=$HOST \
    -e ENVIRONMENT=$ENVIRONMENT \
    -e TARGET_CBD_VERSION=$TARGET_CBD_VERSION \
    --env-file $ENVFILE \
    -v $PWD:/protractor/project \
    -v /dev/shm:/dev/shm \
    hortonworks/docker-e2e-protractor e2e.conf.js --suite $TEST_SUITE
    RESULT=$?
fi

echo " Get the run time Cloudbreak logs!"
mkdir -pv test_log
sudo chown -R jenkins .
ssh -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST docker logs --since=$NOWDATE cbreak_cloudbreak_1 > test_log/cloudbreak-$TARGET_CBD_VERSION.log

exit $RESULT
