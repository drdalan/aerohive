#/bin/bash

function initalize()
{
IPADDRESS="$( ip addr | grep -Po 'inet \K[\d.]+' | grep -v 127.0.0.1 )"
tmp1=/tmp/tmp1
tmp2=/tmp/tmp2

curl -o /tmp/setting.tmp "http://$IPADDRESS:3000/setting/"
curl -o /tmp/emailsetting.tmp "http://$IPADDRESS:3000/emailsetting/"

SECRET=$( cat /tmp/setting.tmp | jq '.[].secret' | sed 's/\"//g' )
clientid=$( cat /tmp/setting.tmp | jq '.[].clientid' | sed 's/\"//g' )
REDIRECT=$( cat /tmp/setting.tmp | jq '.[].redirect' | sed 's/\"//g' )
AUTH=$( cat /tmp/setting.tmp | jq '.[].auth' | sed 's/\"//g' )
OWNERID=$( cat /tmp/setting.tmp | jq '.[].ownerid' | sed 's/\"//g' )

curl -o $tmp1 -s -X GET -H "X-AH-API-CLIENT-SECRET: $SECRET" -H "X-AH-API-CLIENT-ID: 0a192844" -H "X-AH-API-CLIENT-REDIRECT-URI: $REDIRECT" -H "Authorization: $AUTH" -H "Cache-Control: no-cache" "https://cloud-va.aerohive.com/xapi/v1/monitor/devices?ownerId=$OWNERID"

tr ',' '\n' < $tmp1 > $tmp2
#rm -f tmp1 tmp2
grep -w 'deviceId\|connected' $tmp2 > $tmp1
#tr '[{" ' '\b' < $tmp1 > $tmp2
tr -s '[{":' ' ' < $tmp1 > $tmp2
sed 's/\<data\>//g' $tmp2 > $tmp1
tr -s ' ' < $tmp1 > $tmp2
cut -d" " -f3 < $tmp2 > $tmp1
}




function data()
{
if [ ! -e /tmp/data ] ;
then
mkdir /tmp/data
fi
if [ pwd != /tmp/data ]; then
cd /tmp/data
fi
tmp1=/tmp/tmp1
lineNo=0
while IFS='' read -r line || [[ -n "$line" ]]; do
    lineNo=$lineNo+1
    if [ $((lineNo % 2)) != 0 ]; then
        touch $line
        fil="${line}"
    else
        echo $line > "${fil}"
    fi

done < "${tmp1}"

}



function data2()
{
#cd data
tmp1=/tmp/tmp1
lineNo=0
while IFS='' read -r line || [[ -n "$line" ]]; do
    lineNo=$lineNo+1
    if [ $((lineNo % 2)) != 0 ]; then
        touch "$line"_1
        fil="${line}"_1
    else
        echo $line > "${fil}"
    fi

done < "${tmp1}"
}




function compa()
{
tmp1=/tmp/tmp1
lineNo=0
#cd data
while IFS='' read -r line || [[ -n "$line" ]]; do
    lineNo=$lineNo+1
    if [ $((lineNo % 2)) != 0 ]; then
        diff $line "$line"_1 >> /dev/null
        if [ $? != 0 ]; then
            echo $line differs
            val=`cat "$line"_1`
            if [ "$val" = "true" ]; then
                echo " Device Connected"
                status="connected"
            else
                echo " device disconnected"
                status="disconnected"
            fi
            extract $line $status
        fi
    fi

done < $tmp1



}

function extract()
{

SECRET=$( cat /tmp/setting.tmp | jq '.[].secret' | sed 's/\"//g' )
clientid=$( cat /tmp/setting.tmp | jq '.[].clientid' | sed 's/\"//g' )
REDIRECT=$( cat /tmp/setting.tmp | jq '.[].redirect' | sed 's/\"//g' )
AUTH=$( cat /tmp/setting.tmp | jq '.[].auth' | sed 's/\"//g' )
OWNERID=$( cat /tmp/setting.tmp | jq '.[].ownerid' | sed 's/\"//g' )

curl -o /tmp/data/an.txt -s -X GET -H "X-AH-API-CLIENT-SECRET: $SECRET" -H "X-AH-API-CLIENT-ID: 0a192844" -H "X-AH-API-CLIENT-REDIRECT-URI: $REDIRECT" -H "Authorization: $AUTH" -H "Cache-Control: no-cache" "https://cloud-va.aerohive.com/xapi/v1/monitor/devices?ownerId=$OWNERID"

#echo $1
tr '}' '\n' < /tmp/data/an.txt > /tmp/data/antemp.txt
sed 's/\<data\>//g' /tmp/data/antemp.txt > /tmp/data/an.txt
while IFS='' read -r line || [[ -n "$line" ]]; do
    second=`echo $line | cut -d":" -f2 | cut -d"," -f1`
    third=`echo $line | cut -d":" -f3 | cut -d"," -f1`
    if [ "$second" == "$1" ] || [ "$third" == "$1" ]; then
        hostName=`echo $line | cut -d":" -f6 | cut -d"," -f1`
        if [ "$hostName" == "true" ]; then
            hostName=`echo $line | cut -d":" -f7 | cut -d"," -f1`
            ip=`echo $line | cut -d":" -f10 | cut -d"," -f1`
            loc=`echo $line | cut -d":" -f24 | cut -d"]" -f1`
            locnull=`echo $line | cut -d":" -f24 | cut -d"," -f1`
        else
            ip=`echo $line | cut -d":" -f9 | cut -d"," -f1`
            loc=`echo $line | cut -d":" -f23 | cut -d"]" -f1`
            locnull=`echo $line | cut -d":" -f23 | cut -d"," -f1`
        fi
        if [ "$locnull" == "null" ]; then
            location=$locnull
        else
            location=${loc:1}
        fi
        echo $hostName $ip $location
        smtpHostname=$( cat /tmp/emailsetting.tmp | jq '.[].smtpHostname' | sed 's/\"//g' )
        smtpPort=$( cat /tmp/emailsetting.tmp | jq '.[].smtpPort' | sed 's/\"//g' )
        SMTPTO=$( cat /tmp/emailsetting.tmp | jq '.[].toAddr' | sed 's/\"//g' )
        SMTPFROM=$( cat /tmp/emailsetting.tmp | jq '.[].fromAddr' | sed 's/\"//g' )
        SMTPSERVER=$smtpHostname:$smtpPort
        SMTPUSER=$( cat /tmp/emailsetting.tmp | jq '.[].userName' | sed 's/\"//g' )
        SMTPPASS=$( cat /tmp/emailsetting.tmp | jq '.[].password' | sed 's/\"//g' )
        MESSAGE="Your device $hostName $ip $location has $2 Have a nice day, your local Administrator."
        SUBJECT="Device $2"
        echo -e "Subject: $SUBJECT\r\n\r\n$MESSAGE" |msmtp --debug --from=default -t $SMTPTO --tls-certcheck=off
    fi

done < /tmp/data/an.txt
}

initalize
data
sleep 30
initalize
data2
compa
cd ..
source /opt/aerohive/email.sh&
