#!/bin/bash

ipaddr=$( cat /tmp/networksetting.tmp | jq '.[].ipaddr' | sed 's/\"//g' )
subnet=$( cat /tmp/networksetting.tmp | jq '.[].subnet' | sed 's/\"//g' )
gateway=$( cat /tmp/networksetting.tmp | jq '.[].gateway' | sed 's/\"//g' )
dns1=$( cat /tmp/networksetting.tmp | jq '.[].dns1' | sed 's/\"//g' )
dns2=$( cat /tmp/networksetting.tmp | jq '.[].dns2' | sed 's/\"//g' )
hostname=$( cat /tmp/networksetting.tmp | jq '.[].hostname' | sed 's/\"//g' )
IPADDRESS="$( ip addr | grep -Po 'inet \K[\d.]+' | grep -v 127.0.0.1 )"
oldhostname="$( hostname )"

curl -o /tmp/networksetting.tmp "http://$IPADDRESS:3000/networksetting/"

if [ "$hostname" = "$oldhostname" ]; then
        echo error
        exit 0
else
        hostname "$hostname"
        echo "$hostname" > /etc/hostname
        echo "$hostname" > /etc/sysconfig/network
        cat /opt/aerohive/files/hosts | sed 's/HOSTNAME/'"$hostname"'/' > /tmp/hosts
        cp /tmp/hosts /etc/hosts

fi

if [ "$ipaddr" = "dhcp" ]; then
        sudo cp /opt/aerohive/files/ifcfg-ens192.dhcp /etc/sysconfig/network-scripts/ifcfg-ens192
else
        cat /opt/aerohive/ifcfg-ens192.static | sed 's/ipaddress/'"$ipaddr"'/' | sed 's/subnetmask/'"$subnet"'/' | sed 's/defaultgatewa    y/'"$gateway"'/' | sed 's/dns1/'"$dns1"'/' | sed 's/dns2/'"$dns2"'/' > /tmp/ifcfg-ens192.static
        sudo cp /tmp/ifcfg-ens192.static /etc/sysconfig/network-scripts/ifcfg-ens192

fi

sudo /usr/bin/systemctl restart systemd-hostnamed
sudo /usr/bin/systemctl restart network

if [ "$HOSTNAME" = "localhost.localdomain" ]; then
        cat /opt/aerohive/files/mycustom.service.ts | sed 's/HOSTNAME/'"$IPADDRESS"'/' > /tmp/mycustom.service.ts
else
        cat /opt/aerohive/files/mycustom.service.ts | sed 's/HOSTNAME/'"$HOSTNAME"'/' > /tmp/mycustom.service.ts
fi

cat /opt/aerohive/backend/model/admin.js | sed 's/IPADDRESS/'"$IPADDRESS"'/' | sed 's/USERNAME/'"$USERNAME"'/' | sed 's/PASSWORD/'"$PASSWORD"'/' > /tmp/admin.js
cat /opt/aerohive/frontend/protractor.conf.js | sed 's/HOSTNAME/'"$HOSTNAME"'/' > /tmp/protractor.conf.js
cat /opt/aerohive/files/default.conf | sed 's/HOSTNAME/'"$HOSTNAME"'/' | sed 's/IPADDRESS/'"$IPADDRESS"'/' > /tmp/default.conf

sudo cp /tmp/default.conf /etc/nginx/conf.d/default.conf
cp /tmp/admin.js /opt/aerohive/backend/model/admin.js
cp /tmp/protractor.conf.js /opt/aerohive/frontend/protractor.conf.js
cp /tmp/mycustom.service.ts /opt/aerohive/frontend/src/app/service/mycustom.service.ts

sudo /usr/bin/systemctl restart nginx
sudo /usr/bin/systemctl restart backendserver.service
