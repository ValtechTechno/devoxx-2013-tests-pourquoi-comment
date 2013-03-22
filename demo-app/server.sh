#!/bin/bash

DEFAULT_PORT=8888
PORT=$1

if [ -z "$PORT" ]; then
    PORT=$DEFAULT_PORT
fi

python -m SimpleHTTPServer $PORT
