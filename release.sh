#!/bin/bash

rm -rf public/angularjs-client/*
mkdir -p public/angularjs-client
cp -arv angularjs-client/src/* public/angularjs-client
cp -arv angularjs-client/static/* public/angularjs-client
cp -arv angularjs-client/lib public/angularjs-client
