#!/bin/sh
set -e
cd "$(dirname "$0")"
./node_modules/.bin/esbuild src/main.js --bundle --format=iife --target=es2019 --minify --outfile=bundle.js
cp src/styles.css bundle.css
