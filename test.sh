#!/bin/bash

#/opt/aerohive/backend/model/admin.js

HOSTNAME="$( hostname )"
IPADDRESS="$( ip addr | grep -Po 'inet \K[\d.]+' | grep -v 127.0.0.1 )"

echo $HOSTNAME
echo $IPADDRESS
