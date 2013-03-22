#!/bin/bash
echo "Lauching casperJS tests..."

# Launching all tests in suites directory
casperjs test suites --includes=casper-helpers.js --domain=localhost:8888
