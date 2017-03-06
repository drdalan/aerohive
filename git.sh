#!/bin/bash

set -e

HOSTNAME="$( hostname )"
IPADDRESS="$( ip addr | grep -Po 'inet \K[\d.]+' | grep -v 127.0.0.1 )"
USERNAME="$( cat /home/app/info | grep USERNAME | cut -c 10-  )"
PASSWORD="$( cat /home/app/info | grep PASSWORD | cut -c 10-  )"

local_branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
remote=$(git config branch.$local_branch.remote)
echo "Fetching from $remote..."

git fetch $remote

if git merge-base --is-ancestor $remote_branch HEAD; then
    echo 'Already up-to-date'
    exit 0

fi

rm -rf /opt/aerohive/frontend/src/app/service/mycustom.service.ts

if git merge-base --is-ancestor HEAD $remote_branch; then
    echo 'Fast-forward possible. Merging...'
    git merge --ff-only --stat $remote_branch

else
    echo 'Fast-forward not possible. Rebasing...'
    git rebase --preserve-merges --stat $remote_branch

fi

cd /opt/aerohive/
git reset --hard origin/master

if [ "$HOSTNAME" = "localhost.localdomain" ]; then
        cat /opt/aerohive/files/mycustom.service.ts | sed 's/HOSTNAME/'"$IPADDRESS"'/' > /tmp/mycustom.service.ts
        cat /opt/aerohive/backend/model/admin.js | sed 's/IPADDRESS/'"$IPADDRESS"'/' | sed 's/USERNAME/'"$USERNAME"'/' | sed 's/PASSWORD/'"$PASSWORD"'/' > /tmp/admin.js
else
        cat /opt/aerohive/files/mycustom.service.ts | sed 's/HOSTNAME/'"$HOSTNAME"'/' > /tmp/mycustom.service.tsa
        cat /opt/aerohive/backend/model/admin.js | sed 's/IPADDRESS/'"$HOSTNAME"'/' | sed 's/USERNAME/'"$USERNAME"'/' | sed 's/PASSWORD/'"$PASSWORD"'/' > /tmp/admin.js
fi

cat /opt/aerohive/frontend/protractor.conf.js | sed 's/HOSTNAME/'"$HOSTNAME"'/' > /tmp/protractor.conf.js
cat /opt/aerohive/files/default.conf | sed 's/HOSTNAME/'"$HOSTNAME"'/' | sed 's/IPADDRESS/'"$IPADDRESS"'/' > /tmp/default.conf

sudo cp /tmp/default.conf /etc/nginx/conf.d/default.conf
cp /tmp/admin.js /opt/aerohive/backend/model/admin.js
cp /tmp/protractor.conf.js /opt/aerohive/frontend/protractor.conf.js
cp /tmp/mycustom.service.ts /opt/aerohive/frontend/src/app/service/mycustom.service.ts

sudo /usr/bin/systemctl restart nginx
sudo /usr/bin/systemctl restart backendserver.service

echo Upgraded
