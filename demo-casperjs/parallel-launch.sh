#!/bin/bash
echo "Lauching casperJS tests in parallel..."

# Launching tests using GNU/parallel
ls suites/ | /usr/local/bin/parallel casperjs test suites/{} --includes=casper-helpers.js --domain=localhost:8888
