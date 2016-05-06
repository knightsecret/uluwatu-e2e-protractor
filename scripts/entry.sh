#!/bin/bash

activeuser=$(whoami)

if [ ! $activeuser == root ]
    then
        useradd $activuser sudo
        echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
    else
        echo "The user is" $activeuser
fi

su -m $activuser -c /protractor/scripts/run-e2e-tests.sh
