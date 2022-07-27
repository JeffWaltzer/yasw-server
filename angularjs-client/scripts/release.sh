#!/bin/bash
rm -rf ../public/angularjs-client/*
mkdir -p ../public/angularjs-client
cp -arv src/*  ../public/angularjs-client
cp -arv static/* ../public/angularjs-client
cp  -arv lib ../public/angularjs-client
