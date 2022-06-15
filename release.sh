#!/bin/bash

rm -rf public/angularjs-client/*
mkdir -p public/angularjs-client
cp -arv client/src/* public/angularjs-client
cp -arv client/static/* public/angularjs-client
cp -arv client/lib public/angularjs-client
