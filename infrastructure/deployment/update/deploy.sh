#!/bin/bash

SOURCEDIR="/home/jembi/drug-stock-service"

cd $SOURCEDIR;
git pull && puppet apply infrastructure/deployment/update/deploy.pp
