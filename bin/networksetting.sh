#!/bin/bash

curl -o /tmp/networksetting.tmp "http://172.30.28.55:3000/networksetting/"

ipaddr=$( cat /tmp/networksetting.tmp | jq '.[].ipaddr' | sed 's/\"//g' )
subnet=$( cat /tmp/networksetting.tmp | jq '.[].subnet' | sed 's/\"//g' )
gateway=$( cat /tmp/networksetting.tmp | jq '.[].gateway' | sed 's/\"//g' )
dns1=$( cat /tmp/networksetting.tmp | jq '.[].dns1' | sed 's/\"//g' )
dns2=$( cat /tmp/networksetting.tmp | jq '.[].dns2' | sed 's/\"//g' )
hostname=$( cat /tmp/networksetting.tmp | jq '.[].hostname' | sed 's/\"//g' )
oldhostname="$( hostname )"

if [ "$hostname" = "$oldhostname" ]; then
	echo error
else
	hostname "$hostname"
	echo "$hostname" > /etc/hostname
	echo "$hostname" > /etc/sysconfig/network
	cat /root/files/hosts | sed 's/hosts/'"$hostname"'/'
fi

if [ "$ipaddr" = "dhcp" ]; then
	cp /opt/aerohive/files/ifcfg-ens192.dhcp /etc/sysconfig/network-scripts/ifcfg-ens192
else
	cat /opt/aerohive/ifcfg-ens192.static | sed 's/ipaddress/'"$ipaddr"'/' | sed 's/subnetmask/'"$subnet"'/' | sed 's/defaultgatewa    y/'"$gateway"'/' | sed 's/dns1/'"$dns1"'/' | sed 's/dns2/'"$dns2"'/' > /etc/sysconfig/network-scripts/ifcfg-ens192
fi

systemctl restart systemd-hostnamed
systemctl restart network

