#!/bin/bash -x
# -e  Exit immediately if a command exits with a non-zero status.
# -x  Print commands and their arguments as they are executed.

export NOWDATE=$(ssh -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST date +%Y-%m-%d"T"%H:%M:%S)

cat /var/lib/jenkins/guitest/env-$ENVIRONMENT

export TESTCONF=/protractor/project/e2e.conf.js
export ARTIFACT_POSTFIX=info

export ARTIFACT_VERSION=$(curl -sk $API_URL$ARTIFACT_POSTFIX | jq .app.version -r)
echo artifact version: $ARTIFACT_VERSION

docker pull hortonworks/docker-e2e-protractor

export TEST_CONTAINER_NAME=uluwatu-e2e-$ENVIRONMENT

if [[ "$(docker inspect -f {{.State.Running}} $TEST_CONTAINER_NAME 2> /dev/null)" == "true" ]]; then
  docker rm -f $TEST_CONTAINER_NAME
fi

docker run -i \
--privileged \
--rm \
--name $TEST_CONTAINER_NAME \
--env-file /var/lib/jenkins/guitest/env-$ENVIRONMENT \
-v $WORKSPACE:/protractor/project \
-v /dev/shm:/dev/shm \
hortonworks/docker-e2e-protractor e2e.conf.js
RESULT=$?

mkdir -pv test_log

sudo chown -R jenkins .

ssh -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST docker logs --since=$NOWDATE cbreak_cloudbreak_1 > test_log/cloudbreak-$ARTIFACT_VERSION.log

exit $RESULT
