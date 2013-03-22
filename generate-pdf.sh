#!/bin/bash
echo "Launching server to serve slide..."
python -m SimpleHTTPServer &
server=$!
echo "Web server runs on port $!"

echo "Generating screenshot by CasperJS..."
casperjs test generate-pdf.js --includes=demo-casperjs/casper-helpers.js --domain=localhost:8000

echo "Generating PDF with ImageMagic..."
convert dist/screenshots/*.png slides.pdf && evince slides.pdf

echo "stopping server..."
kill $server
