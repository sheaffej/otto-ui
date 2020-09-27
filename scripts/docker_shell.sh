#!/usr/bin/env bash

IMAGE="sheaffej/otto-ui"
CONTAINER_NAME="otto-ui"

MYDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker rm -f $CONTAINER_NAME

docker run -d \
--name $CONTAINER_NAME \
-p 4200:4200 \
--restart always \
$IMAGE $@
